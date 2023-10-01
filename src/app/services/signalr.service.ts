import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { Message } from '../models/message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PrivateChatComponent } from '../components/private-chat/private-chat.component';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  myEmail: string = this.auth.getemailfromtoken();
  onlineUsers: string [] = [];
  message: Message[] = [];
  privateMessages: Message[] = [];
  privateMessageInitiated = false;

  constructor(private auth:AuthService, private model:NgbModal) { }

  hubConnection!:signalR.HubConnection;

  startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://localhost:7061/chat',{
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .withAutomaticReconnect()
    .build();

    this.hubConnection.start()
    .then(()=>{
      console.log('SignalR connection started.');
    })
    .catch(err => console.log('Error while starting connection: ' + err))

    this.hubConnection.on("UserConnected", ()=>{
      this.adduserConnectionid();
    })

    this.hubConnection.on("OnlineUsers", (OnlineUsers)=>{
      this.onlineUsers = [OnlineUsers]
    })

    this.hubConnection.on("NewMessage",(newMessage: Message) =>{
      this.message = [...this.message, newMessage]
    })

    this.hubConnection.on("OpenPrivateChat",(newMessage: Message) =>{
      this.privateMessages = [...this.privateMessages, newMessage]
      this.privateMessageInitiated = true;
      const modelRef = this.model.open(PrivateChatComponent);
      modelRef.componentInstance.toUser = newMessage.sender;
    })

    this.hubConnection.on("NewPrivateMessage",(newMessage: Message) =>{
      this.privateMessages = [...this.privateMessages, newMessage]
    })

    this.hubConnection.on("ClosePrivateChat",() =>{
      this.privateMessageInitiated = false,
      this.privateMessages = [],
      this.model.dismissAll();
    })

  }


  stopConnection(){
    this.hubConnection.stop().catch(err => console.log(err))
  }


  adduserConnectionid(){
    console.log(this.myEmail)
    this.hubConnection.invoke("AddUserConnectionId", this.myEmail);
  }

  async getConnectedClients() {
    return this.hubConnection.invoke("GetConnectedClients");
  }

  async sendMessage(content: string){
    const message: Message ={
      sender:this.myEmail,
      content
    }

    return this.hubConnection.invoke('ReceiveMessage', message).catch(error => console.log(error));

  }

  async sendPrivateMessage(receiver: string,content: string){
    const message: Message ={
      sender: this.myEmail,
      receiver,
      content
    }
    if(!this.privateMessageInitiated){
      this.privateMessageInitiated = true;
      this.auth.addtext(message);
      return this.hubConnection.invoke('CreatePrivateChat', message).then(()=>{
        this.privateMessages = [...this.privateMessages, message]
      })
      .catch(error => console.log(error))
      }
      else{
        this.auth.addtext(message);
        return this.hubConnection?.invoke('ReceivePrivateMessage',message).catch(error => console.log(error));
      }

  }

  async closePrivateChatMessage(otherUser: string){
    console.log(this.myEmail)
    this.hubConnection.invoke("RemovePrivateChat", this.myEmail, otherUser);
  }


}
