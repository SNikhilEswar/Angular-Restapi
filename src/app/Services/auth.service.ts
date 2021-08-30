import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from '../modules/authinterface';
import { Config } from '../modules/config';
import { User } from '../modules/usermodel';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private error:ErrorService, private roter: Router) {
   }

  user = new BehaviorSubject<User>(null)
  profileInfo = new BehaviorSubject<any>({
    displayName: '',
    email: '',
    photoUrl: ''
  })

  SignUp(email, password) {
  return  this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+Config.API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this.error.handelError(err)
      }),
      tap(res => {
        this.authenticateUser(res.email, res.localId, res.idToken, +res.idToken )
      })
    )
  }




  SignIn(email, password) {
    return this.http.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+Config.API_KEY, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(err => {
        return this.error.handelError(err)
      }),
      tap(res => {
        this.authenticateUser(res.email, res.localId, res.idToken, +res.expiresIn)
      })
    )
  }




  autoSignin() {

    const userdata = JSON.parse(localStorage.getItem('userData'));
    console.log(userdata)
    if(!userdata) {
      return
    }
    const loggedInUser = new User(userdata.email, userdata.id, userdata._token, new Date(userdata._tokenExpirationDate))
    if(loggedInUser.token) {
      this.user.next(loggedInUser)
    }
    this.getData(loggedInUser.token)
  }



signOut() {
  this.user.next(null);
  this.roter.navigate(['auth']);
  localStorage.removeItem('userData')
}






private authenticateUser(email,userId,token,expiresIn) {
const expirationDate = new Date(new Date().getTime()+ expiresIn*1000)
const user = new User(email,userId,token,expirationDate)
this.user.next(user);
localStorage.setItem('userData', JSON.stringify(user))
console.log('user =>', user)
this. getData(token)
}


updateProfile(data) {
  return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${Config.API_KEY}`, {
    idToken: data.token	,
    displayName: data.name,	
    photoUrl: data.picture,
    returnSecureToken: true
   }).pipe(
     catchError(err => {
       return this.error.handelError(err)
     })
   )
 }


 getData(token) {
  this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${Config.API_KEY}`,
   {
    idToken:token
   }
   ).pipe(
    catchError(err => {
      return this.error.handelError(err)
    })
  )
   .subscribe(res => {
     this.profileInfo.next({
      displayName:res.users[0].displayName,
      email:res.users[0].email,
      photoUrl:res.users[0].photoUrl
     })
   })
 }



 changePassword(data) {
  return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${Config.API_KEY}`, {
    idToken: data.token,
    password: data.password,
    returnSecureToken:true
   }).pipe(
     catchError(err => {
       return this.error.handelError(err);
     })
   )
 }




forgotPassword(data) {
  return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${Config.API_KEY}`, {
    requestType: "PASSWORD_RESET",
    email: data.email
  }).pipe(
    catchError(err => {
      return this.error.handelError(err)
    })
  )
}





















































































}