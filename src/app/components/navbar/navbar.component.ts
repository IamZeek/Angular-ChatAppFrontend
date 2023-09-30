import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
}
