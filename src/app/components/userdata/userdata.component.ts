import { AfterViewInit, Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss']
})
export class UserdataComponent implements AfterViewInit{

  data: any;

 constructor(private store: ApiService,public usagedata: UserDataService){
 }


 ngAfterViewInit() {
  this.usagedata.getUserdata().subscribe(user => this.data = user );
  console.log(this.data);
  };
}
