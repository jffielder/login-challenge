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
              private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
      // check if logged in
      if (this._loginService.isLoggedIn())
        return true;
      
      
      // if not logged in, 
      this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
      return false;   
  }
}


/*
todo:
protect secure page routing with an authgaurd 
request protected resources from secure page to display (users)

make refreshtokens useful
make logout button make api/delete call

*/
