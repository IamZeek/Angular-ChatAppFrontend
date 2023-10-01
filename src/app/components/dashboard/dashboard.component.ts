import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { SignalrService } from 'src/app/services/signalr.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user: any = [];
  public name: string = "";
  public role!: string;
  public page = localStorage.getItem('page');

  constructor(private auth: AuthService, private api:ApiService, private Userstore: UserStoreService, private signalr:SignalrService){}

  ngOnInit() {

    this.Userstore.getNameFromStore().subscribe(val=>{
      let namefromtoken = this.auth.getnamefromtoken();
      this.name = val || namefromtoken
    })

    this.Userstore.getRoleFromStore().subscribe(val=>{
      let roleFromToken = this.auth.getrolefromtoken();
      this.role = val || roleFromToken
    })


    this.signalr.startConnection();


  }



}
