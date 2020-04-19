import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreRfxWriteGuard implements CanActivate {
  constructor(
    private _auth: AuthService
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this._auth.currentUser$.pipe(
      take(1),
      map(
        users => {
          return users[0] && users[0].view_access.indexOf('pre_rfx_write') > -1
        }),
      tap(hasPreRFxViewAccess => {
        if (!hasPreRFxViewAccess) {
          console.error('Access denied - The user does not have Pre-RFx write Access')
        }
      })
    );
  }
  
}
