import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { AuthResponse } from './auth-response.model';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiKey:string = "writeYourKey";
  // başlangıçta null verdik fakat login ve signUp metotlarında this.user.next diyerek içerisine bilgi gönderiyoruz
  // BehaviorSubject kullanmamızın nedeni bu metotlar içerisinde subscribe olmadan veri göndermemizdir. Böylece bir önceki veriyi okuma
  // imkanımız oluyor
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email:string, password:string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        // const expirationDate = new Date(new Date().getTime() + (+response.expiresIn * 1000));
        // const user = new User(response.email, response.localId, response.idToken, expirationDate);
        // this.user.next(user);
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      })
    );
    
  }

  login(email:string ,password: string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey, {
      email:email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        // const expirationDate = new Date(new Date().getTime() + ( +response.expiresIn * 1000));
        // const user = new User(response.email, response.localId, response.idToken, expirationDate);
        // this.user.next(user);
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      })
    );
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  autoLogin(){
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user) {
      console.log("User bilgisi yok");
      return;
    }

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate));

      if(loadedUser.token){
        this.user.next(loadedUser);
      }
  }
  
  handleAuthentication(email:string, userId:string, token:string, expiresIn: number){
      const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
      const user = new User(email, userId, token, expirationDate);
      this.user.next(user);
      localStorage.setItem("user", JSON.stringify(user));
  }
}
