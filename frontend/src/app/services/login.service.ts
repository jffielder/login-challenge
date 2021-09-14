import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http'
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url = 'http://localhost:3001/api/'
  constructor(private _http: HttpClient) { }

  login(user: User): any {
    // Send user data in html body to login server
      return this._http.post(this._url + 'login', user)
  }

  logoff(token: any) {
    // Send token to authserver to be deleted from db
    return this._http.delete(this._url + 'logout', token)
  }

  register(user: User): any {
    // Send user data in html body to login server
      return this._http.post('http://localhost:3000/api/register', user)
  }
}
