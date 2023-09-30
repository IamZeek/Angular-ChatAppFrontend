import { AfterViewInit, Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss']
})
export class UserdataComponent implements AfterViewInit{

  users: Array<{ id:number ,name: string , email:string }> = [];

 constructor(private store: ApiService){}


 ngAfterViewInit() {
  this.store.getUser().subscribe((userdata) =>{
   this.users = userdata
  });
}
}
