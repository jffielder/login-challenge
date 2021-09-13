import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  _url = 'http://localhost:3001/api/login'
  constructor(private _http: HttpClient) { }

  login(user: User) {
    // Send request to database
      return this._http.post(this._url, user)
  }     
}
