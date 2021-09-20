import { Injectable } from '@angular/core';

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    // saves token 
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    //returns token from 
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    //saves refresh to 
    localStorage.setItem(REFRESH_KEY, token);
  }

  public getRefreshToken() {
    //returns refreshtoken from storage
    return localStorage.getItem(REFRESH_KEY);
  }

  public isExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
