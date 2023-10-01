import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ChangepageService } from 'src/app/services/changepage.service';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() name!: string;
  @Input() role!: string;

  constructor(private auth: AuthService, private signalr:SignalrService){}
  LogOut(){
    this.signalr.stopConnection();
    this.auth.LogOut();
  }

  toggleChat(check: string) {
    localStorage.setItem('page', check)
  }

}
