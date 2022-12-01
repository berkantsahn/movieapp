import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthResponse } from './../models/AuthResponse';


@Injectable()
export class AuthService {

  apiKey:string = "AIzaSyDiQ8SKqXLH75D6y82zu971u_Fzg08jUYk";

  constructor(private http: HttpClient) { }

  signUp(email:string, password:string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError));
  }

  login(email:string ,password: string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey, {
      email:email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError));
  }

  private handleError(response: HttpErrorResponse){
    let message = "Bir hata oluştu";

    if(!navigator.onLine){
      message = "İnternet bağlantınız yok!";
      return throwError(message);
    }

    if(response.error.error){
      switch(response.error.error.message){
        case "EMAIL_EXISTS": 
          message = "Girilen mail ile daha önceden üye olunmuş!";
          break;
        case "EMAIL_NOT_FOUND":
          message = "Girilen mail adresi bulunamadı!";
          break;
        case "INVALID_PASSWORD":
          message = "Girilen şifre doğru değil!";
          break;
      }
    }
    return throwError(message);
  }
}
