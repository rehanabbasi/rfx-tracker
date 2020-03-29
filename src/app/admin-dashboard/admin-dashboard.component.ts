import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.sass']
})
export class AdminDashboardComponent implements OnDestroy {
  public pageHeading: string = ''
  private subscriptions: Subscription[] = []

  constructor(
    _router:Router
  ) {
    this.subscriptions.push(
      _router.events.pipe(
        filter( event => event instanceof NavigationEnd),
        map( event => {
          let currentRoute = event['urlAfterRedirects'].split('/')[2]

          switch(currentRoute) {
            case 'business-unit':
              this.pageHeading = 'Business Unit'
              break;
            case 'client-agency':
              this.pageHeading = 'Client Agency'
              break;
            case 'rfx-category':
              this.pageHeading = 'RFx Category'
              break;
            case 'rfx-type':
              this.pageHeading = 'RFx Type'
              break;
            case 'rfx-doc-type':
              this.pageHeading = 'RFx Document Type'
              break;
            case 'proposal-doc-type':
              this.pageHeading = 'Proposal Document Type'
              break;
            case 'user-role':
              this.pageHeading = 'User Role'
              break;
            case 'user':
              this.pageHeading = 'User'
              break;
            case 'view-role':
              this.pageHeading = 'View Access by Role'
              break;
            case 'user-bu':
              this.pageHeading = 'User - Business Unit'
              break;
            case 'user-cat':
              this.pageHeading = 'User - RFx Category'
              break;

            default:
              break;
          }
        })
      ).subscribe()
    )
  }

  ngOnDestroy(){
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }

}
