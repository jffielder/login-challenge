import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http'
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url = 'http://localhost:3001/api/'
  loggedIn: boolean = false;
  constructor(private _http: HttpClient ) { }

  login(user: User): any {
    // Send user data in html body to login server
    return this._http.post(this._url + 'login', user)
  }

  logoff(token: any) {
    // Send token to authserver to be deleted from db
    this.loggedIn = false;

    // ERROR: not getting anything in body:

    const headers = new HttpHeaders().set('token', token) // { headers }
    return this._http.delete(this._url + 'logout', { headers })
  }

  register(user: User): any {
    // Send user data in html body to login server
      return this._http.post('http://localhost:3000/api/register', user)
  }

  token(token: any): any {
    // send token to authServer to see if its still valid
    return this._http.post(this._url + 'token', token )
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn = value;
  }

  isLoggedIn(): boolean {

    return this.loggedIn;
  }
}
