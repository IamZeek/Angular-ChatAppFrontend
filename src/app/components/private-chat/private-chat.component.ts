import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-private-chat',
  templateUrl: './private-chat.component.html',
  styleUrls: ['./private-chat.component.scss']
})
export class PrivateChatComponent implements OnInit,OnDestroy {
  @Input() toUser = '';
  constructor(public modal: NgbActiveModal,public signalr:SignalrService){}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.signalr.closePrivateChatMessage(this.toUser);
  }

  sendMessage(content: string){
    this.signalr.sendPrivateMessage(this.toUser,content);
  }

}
