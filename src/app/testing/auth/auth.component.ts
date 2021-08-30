import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Observable } from 'rxjs';
import { AuthResponse } from 'src/app/modules/authinterface';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  Form:FormGroup
loginMode:boolean = true;
error;

islogging:boolean;
  constructor(private fb:FormBuilder, private authservices: AuthService, private router:Router) { }


  onLoginMode() {
    this.loginMode = !this.loginMode
  }



  ngOnInit(): void {
    this.Form = this.fb.group({
      email: ['nikhil@2.com', [Validators.required, Validators.email]],
      password: ['123456789', [Validators.required, Validators.minLength(6)]]
    })
  }


  onSubmit() {
    console.log(this.Form.value)


    if(this.Form.valid) {
      console.log(this.Form.value);
      const email = this.Form.value.email;
      const password = this.Form.value.password;


      let authObservable : Observable<AuthResponse>;

      if(!this.loginMode) {
        authObservable = this.authservices.SignUp(email, password)
      }else {
        authObservable = this.authservices.SignIn(email,password)
      }
      authObservable.subscribe(res => {
        console.log( 'form Submited =>', res)
        this.router.navigate(['dasboard'])
      },
      (err) => {
        console.log( this.error = err)
        this.error = err
      })
    }else {
      //
    }

  }

}
