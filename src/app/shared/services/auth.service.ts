import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AdminService, User } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$: Observable<any>
  public isLoggedIn: Observable<boolean>

  public  ADMIN_ROLE_ID: string = 'kq7fQ8pUoPcA2k7wqAMb'

  constructor(
    private _afAuth: AngularFireAuth,
    private _admin: AdminService
  ) { 

    this.currentUser$ = this._afAuth.authState.pipe(
      switchMap( (user) => {
        if(user){
          return this._admin.getUsersByEmail(user.email).valueChanges()
        } else {
          return of(null)
        }
      })
    )
    
    this.isLoggedIn = this._afAuth.authState.pipe(
      map((user: firebase.User)=>{
        return user !== null
      })
    )
  }

  public login( data: { email: string, pwd: string } ): Promise<any> {
    return this._afAuth.auth.signInWithEmailAndPassword(data.email, data.pwd)
  }

  public createUserAuth(email: string, pwd: string): Promise<firebase.auth.UserCredential>{
    return this._afAuth.auth.createUserWithEmailAndPassword(email, pwd)
  }

  public logout(): Promise<any> {
    return this._afAuth.auth.signOut()
  }
}
