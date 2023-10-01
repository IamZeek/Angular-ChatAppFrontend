import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangepageService {
  private dataSubject = new BehaviorSubject<string>("");
  public data = this.dataSubject.asObservable();
  constructor() { }

  sendData(data: any) {
    this.dataSubject.next(data);
  }
}
