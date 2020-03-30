import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {
  constructor(
    private router: Router,
    private _auth: AuthService
    ) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): Observable<boolean> | boolean {
    return this._auth.isLoggedIn.pipe(
      map((loggedIn: boolean)=>{
        if(loggedIn) {
          this.router.navigate(['/pre-rfx-search'])
        }
        return !loggedIn;
      })
    )
  }
}