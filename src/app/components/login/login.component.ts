import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  tokenPayload!: User;
  constructor (private fb: FormBuilder, private auth: AuthService, private router : Router, private userStore: UserStoreService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    localStorage.setItem('page', 'Home')
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }

  onLogIn(){
    if(this.loginForm.valid){
      this.auth.LogIn(this.loginForm.value).subscribe({
        next:(res)=>{
          this.auth.setToken(res.token);
          this.tokenPayload = this.auth.decodeToken();
          this.userStore.setNameFromStore(this.tokenPayload.name);
          this.userStore.setRoleFromStore(this.tokenPayload.role);
          this.onLogInPost();
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })


    }
    else{
      ValidateForm.validateAllFields(this.loginForm)
    }
  }

  onLogInPost(){
    this.auth.registerUser(this.loginForm.value).subscribe({
      next:(res)=>{
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      },
      error:(err)=>{
        alert("register error: "+err?.error.message)
      }
    })
  }
}
