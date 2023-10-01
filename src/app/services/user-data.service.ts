import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService{

  private baseUrl:string = "https://localhost:7061/api/chat/";
  constructor(private http : HttpClient) {}


  getUserdata(){
    return this.http.get(`${this.baseUrl}get-data`);
  }
}
