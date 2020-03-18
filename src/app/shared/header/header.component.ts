import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  abc = 'search'
  constructor(
    public _auth: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {}

  public logout(): void {
    this._auth.logout()
      .then( response => {
        this.router.navigateByUrl('/login')
      })
      .catch( error => {
        console.error('Unable to logout user: ', error)
      })
  }

}
