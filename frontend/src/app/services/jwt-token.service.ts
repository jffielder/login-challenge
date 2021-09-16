import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { decode } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  decodedToken?: {[key: string]: string}
  jwtToken: string;
  
  constructor(jwtToken: string) {
    this.jwtToken = jwtToken;
   }
  
  public setToken(token: string) {
    this.jwtToken = token;
  } 

  public decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken)
    }
  }

  public getDecodedToken(): string {
    return jwt_decode(this.jwtToken);
  }

  public getExpiryTime() {
    this.decodeToken()
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  public isTokenExpired() {
    let expiryTime;
    expiryTime = this.getExpiryTime() ? this.getExpiryTime() : null;
    if (expiryTime) {
      return true
    } else {
      return false;
    }
  }

}
