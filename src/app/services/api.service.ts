import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = "https://localhost:7061/api/User/"
  constructor(private http: HttpClient) { }

  getUser(){
    return this.http.get<any>(this.baseUrl)
  }

}
