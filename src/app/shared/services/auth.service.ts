import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/Operator';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: any = {}
  public isLoggedIn: Observable<boolean>

  constructor(
    private _afAuth: AngularFireAuth
  ) { 
    this._afAuth.authState.subscribe( user => {
      if(user){
        this.currentUser = user.providerData[0]
        console.log("Current logged-in user: ", this.currentUser)
      } else {
        this.currentUser = null
      }
    })
    this.isLoggedIn = this._afAuth.authState.pipe(
      map((user: firebase.User)=>{
        return user !== null
      })
    )
  }

  public login( data: { email: string, pwd: string } ): Promise<any> {
    return this._afAuth.auth.signInWithEmailAndPassword(data.email, data.pwd)
  }

  public logout(): Promise<any> {
    return this._afAuth.auth.signOut()
  }
}
