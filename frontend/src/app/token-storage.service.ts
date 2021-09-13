import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const REFRESH_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor() { }

  signOut(): void {

  }

  public saveToken(token: string): void {
    // saves token to cookie
  }

  public getToken(): string {
    //returns token from cookie
    return '';
  }

  public saveRefreshToken(token: string): void {
    //saves refresh to cookie
  }

  public getRefreshToken(): string {
    //returns refreshtoken from storage
    return '';
  }

  public saveUser(user: any): void {
    // saves user info to cookies
  }

  public getUser(): any {
    // returns user obj from cookie
    return {}
  }
}
