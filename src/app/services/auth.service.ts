import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './../models/AuthResponse';


@Injectable()
export class AuthService {

  apiKey = "AIzaSyDiQ8SKqXLH75D6y82zu971u_Fzg08jUYk";

  constructor(private http: HttpClient) { }

  signUp(email:string, password:string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.apiKey, {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }

  login(email:string ,password: string){
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.apiKey, {
      email:email,
      password: password,
      returnSecureToken: true
    });
  }
}
