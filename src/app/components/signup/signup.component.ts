import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/validateform';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupform!: FormGroup;
  items: Array<{ name: string }> = [
    { name: 'Normal' },
    { name: 'Vendor' }
  ];

  selectedItem: string = "Normal";

  constructor(private fb: FormBuilder, private auth: AuthService, private router : Router) {}

  ngOnInit(): void {
    this.signupform=this.fb.group({
      name: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      role: ['',Validators.required]
    });
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"
  }

  selectItem(item: { name: string }) {
    this.selectedItem = item.name;
  }

  onSignUp(){
    if(this.signupform.valid){
      this.auth.SignUp(this.signupform.value).subscribe({
        next:(res)=>{
          alert('User Registered');
          this.signupform.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      ValidateForm.validateAllFields(this.signupform)
    }
  }


}
