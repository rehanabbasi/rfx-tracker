import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, merge } from 'rxjs';
import { map, switchMap, mergeMap } from 'rxjs/operators';

import { AdminService, User } from './admin.service';
import { getLocaleDateFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$: Observable<any>
  public isLoggedIn: Observable<boolean>

  // public  ADMIN_ROLE_ID: string = 'kq7fQ8pUoPcA2k7wqAMb' // Dev Environment
  public  ADMIN_ROLE_ID: string = 'ZZxx38pv34wQFl55Bxz8' // Prod Environment

  constructor(
    private _afAuth: AngularFireAuth,
    private _admin: AdminService
  ) { 

    this.currentUser$ = this._afAuth.authState.pipe(
      switchMap( user => {
        if(user) {
          return this._admin.getUsersByEmail(user.email).valueChanges().pipe(
            switchMap( userArray => {
              if(userArray) {
                return this._admin.getRoleByIds(userArray[0].role_ids).pipe(
                  map( roles => {
                    let userData = userArray[0]
                    let view_access_array: string[] = []
                    for(let role of roles) {
                      view_access_array = this.arrayUnique(view_access_array.concat(role.view_access))
                    } 
                    userData['view_access'] = view_access_array
                    return [ userData ]
                  })
                )
              } else { return of(null) }
            })
          )
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

  private arrayUnique(array: string[]): string[] {
    var uniqueArray = array.concat();
    for(var i=0; i < uniqueArray.length; ++i) {
      for(var j = i + 1; j < uniqueArray.length; ++j) {
        if(uniqueArray[i] === uniqueArray[j])
          uniqueArray.splice(j--, 1);
      }
    }
    return uniqueArray;
  }
}
