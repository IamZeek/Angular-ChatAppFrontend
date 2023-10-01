import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
import { User } from '../models/User';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7061/api/User/";
  private chatUrl:string = "https://localhost:7061/api/chat/";
  private userpayload:any;
  constructor(private http : HttpClient, private router: Router ) {
    this.userpayload = this.decodeToken();
  }

  SignUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj)
  }

  LogIn(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  LogOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  registerUser(user: User){
    return this.http.post(`${this.chatUrl}register-user`,user,{responseType: 'text'})
  }

  addtext(msg: Message){
    return this.http.post(`${this.chatUrl}add-text`,msg,{responseType: 'text'}).subscribe((res) => console.log(res))
  }

  setToken(token: string){
    localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  checkLogIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodeToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(token)
    return jwtHelper.decodeToken(token)
  }

  getnamefromtoken(){
    if(this.userpayload)
    return this.userpayload.unique_name
  }

  getrolefromtoken(){
    if(this.userpayload)
    return this.userpayload.role
  }

  getemailfromtoken(){
    if(this.userpayload)
    return this.userpayload.email
  }


}
