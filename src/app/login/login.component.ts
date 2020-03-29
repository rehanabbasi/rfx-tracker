import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loginForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    pwd: ['', Validators.required]
  })

  public formStatusMessage: string = ''

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public loginSubmit(): void {
    if(this.loginForm.valid){
      this.formStatusMessage = ''
      this._auth.login(this.loginForm.value)
        .then( res => {
          console.log('loging response: ', res)
          if (res.user) {
            this.router.navigateByUrl('/search')
          }
        })
        .catch( error => {
          if (error.code){
            this.formStatusMessage = error.message
          }
        })
    } else {
      if (this.loginForm.controls.email.errors) {
        this.formStatusMessage = this.loginForm.controls.email.errors.required ? 'Email is a required fields.' : 'Enter a valid email'
      } else if (this.loginForm.controls.pwd.errors) {
        this.formStatusMessage = 'Password is a required field.'
      }
    }
  }

}
