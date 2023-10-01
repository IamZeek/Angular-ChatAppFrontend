import { Component, Input } from '@angular/core';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  @Input() messages: Message[] = [];
  myemail: string = this.auth.getemailfromtoken();
  constructor(public auth:AuthService){}
}
