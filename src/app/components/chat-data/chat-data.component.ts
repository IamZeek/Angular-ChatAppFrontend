import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule } from '@angular/forms';


@Component({
  selector: 'app-chat-data',
  templateUrl: './chat-data.component.html',
  styleUrls: ['./chat-data.component.scss']
})
export class ChatDataComponent implements AfterViewInit {

  content: string = '';
  @Output() contentEmitter = new EventEmitter();

  constructor(private fb:FormBuilder){}
  ngAfterViewInit(): void {

  }
  sendMessage(){
    if(this.content.trim() != ""){
      this.contentEmitter.emit(this.content);
      this.content = "";
    }
  }


}
