import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private role$ = new BehaviorSubject<string>("");
private name$ = new BehaviorSubject<string>("");
private email$ = new BehaviorSubject<string>("");
  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleFromStore(role:string){
    this.role$.next(role);
  }

  public getNameFromStore(){
    return this.name$.asObservable();
  }

  public setNameFromStore(name:string){
    this.name$.next(name);
  }


}