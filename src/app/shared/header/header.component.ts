import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCog, faFileContract } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public preRFxIcon = faFileContract
  public adminDashboardIcon = faUserCog
  public currentUser: any
  constructor(
    public _auth: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this._auth.currentUser$.subscribe( users => {
      if (users && users.length > 0){
        this.currentUser = users[0]
      }
    })
  }

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
