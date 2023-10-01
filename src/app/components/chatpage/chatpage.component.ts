import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/User';
import { Message } from 'src/app/models/message';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { PrivateChatComponent } from '../private-chat/private-chat.component';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements AfterViewInit,OnInit{

  myemail: string = this.auth.getemailfromtoken();
  users!: Array<{ id:number, name: string, email:string}>;
  emails!: string[];
  selectedid: string = "";
  msgform !: FormGroup;
  onlineUsers!:  Array<{ id:number, name: string, email:string}>;
  messages: Message[] = [];

  constructor(private fb: FormBuilder,public signalr:SignalrService, private api:ApiService, private userStore:UserStoreService, private auth: AuthService, public model:NgbModal){}

  ngOnInit() {
    this.msgform = this.fb.group({
      msg: ['',Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.api.getUser().subscribe(user =>{
      this.users = user
    })

    this.msgform = this.fb.group({
      msg: ['', Validators.required]
    })

  }

  sendMessage(content: string){
    const message: Message ={
      sender: this.myemail,
      receiver: "All",
      content
    }
    this.auth.addtext(message)
    this.signalr.sendMessage(content);
  }

  OpenPrivateChat(toUser: string){
    const modelRef = this.model.open(PrivateChatComponent)
    modelRef.componentInstance.toUser = toUser;
  }

}

