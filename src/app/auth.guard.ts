import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  localstorage: Storage
  constructor(private router: Router) {
     this.localstorage = window.sessionStorage
  }
  token = null
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.token = this.router.getCurrentNavigation().extras.state
    if(this.localstorage.getItem('token')!==null)
    {
      return true;
    }

    this.router.navigate(['studentlogin'])
    return false;

  }

}
