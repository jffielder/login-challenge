import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';
import { TokenStorageService } from './services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private _loginService: LoginService,
              private _tokenService: TokenStorageService,
              private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // this._loginService.reqToken(this._tokenService.getToken)

      if (this._loginService.loggedIn){
        return true;
      } else {

        var validated: boolean;
        
        // Observes server request for new login accesstoken given user's refresh token
        return new Observable<boolean>( (observer) => {
          setTimeout( () => {

            // fetch accessToken with refreshToken
            this._loginService.fetchToken(this._tokenService.getRefreshToken())
            .subscribe(
            (data: any) => {
              
              // successful refresh
              validated = true;
              this._tokenService.saveToken(data.accessToken)
              this._loginService.setLoggedIn(true)
              },
            (error: any) => {
              
              // failed refresh
              validated = false;
              console.log("Invalid Access: ", error)
              this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
              })
            observer.next(validated);
            observer.complete()
          
          })
        })
      
      }
}
}