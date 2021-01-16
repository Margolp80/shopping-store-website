import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthResponseData{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userIsSignedIn=localStorage.getItem("User");
  constructor(private http:HttpClient) { }

  signUp(email:string,password:string){
   return this.http.post<AuthResponseData>(
     'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgFSKxhkEtAiVqeD3BGmEnL7olX8dCRv0',
     {email:email,password:password,returnSecureToken:true})
  }

  
  login(email:string,password:string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDgFSKxhkEtAiVqeD3BGmEnL7olX8dCRv0',
      {email:email,password:password,returnSecureToken:true})
  }
}
