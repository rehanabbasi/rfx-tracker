import { Component, OnDestroy } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.sass']
})
export class SideNavComponent implements OnDestroy {
  public navSecHeaderIcon = faChevronDown

  public orgLinksShown: boolean = false
  public securityLinksShown: boolean = false
  private subscriptions: Subscription[] = []

  private oraganizationalSubRoutes: string[] = [ 'business-unit', 'client-agency', 'rfx-category', 'rfx-type', 'rfx-doc-type', 'proposal-doc-type', 'user-role', 'user' ]
  private securitySubRoutes: string[] = [ 'view-role', 'user-bu', 'user-cat']
  public currentRoute: string = ''
  
  constructor(
    private _router:Router
  ) {
    this.subscriptions.push(
      this._router.events.pipe(
        filter( event => event instanceof NavigationEnd),
        map( event => {
          this.currentRoute = event['urlAfterRedirects'].split('/')[2]
          if(this.oraganizationalSubRoutes.indexOf(this.currentRoute) > -1) {
            this.orgLinksShown = true
            this.securityLinksShown = false
            $('#organizationalNavLinks').collapse('show')
            $('#securityNavLinks').collapse('hide')
          } else if (this.securitySubRoutes.indexOf(this.currentRoute) > -1) {
            this.orgLinksShown = false
            this.securityLinksShown = true
            $('#organizationalNavLinks').collapse('hide')
            $('#securityNavLinks').collapse('show')
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
