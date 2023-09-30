import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  myEmail: string = this.auth.getemailfromtoken();
  onlineUsers: string [] = [];
  message: Message[] = [];

  constructor(private auth:AuthService) { }

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

  sendMessage(content: string){
    const message: Message ={
      sender:this.myEmail,
      content
    }
    return this.hubConnection?.invoke('ReceiveMessage',message).catch(error => console.log(error));
  }

}
