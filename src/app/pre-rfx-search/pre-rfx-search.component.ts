import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { faEdit, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

import { PreRfxService, PreRFx } from '../shared/services/pre-rfx.service';
import { AdminService, BusinessUnit, RfxCategory, ClientAgency, User } from '../shared/services/admin.service';

@Component({
  selector: 'app-pre-rfx-search',
  templateUrl: './pre-rfx-search.component.html',
  styleUrls: ['./pre-rfx-search.component.sass']
})
export class PreRfxSearchComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = []
  public preRFxs: PreRFx[] = []
  
  public businessUnits: BusinessUnit[] = []
  public rfxCategories: RfxCategory[] = []
  public clientAgencies: ClientAgency[] = []
  public users: User[] = []

  public preRFxStatus: {
    value: string,
    label: string
  }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'push-back', label: 'Push Back' },
    { value: 'no-go', label: 'No Go' },
    { value: 'go', label: 'Go' }
  ]

  private sources: {
    value: string,
    label: string
  }[] = [
    { value: 'bid-main', label: 'Bid Main' },
    { value: 'my-bid-match', label: 'My Bid Match' },
    { value: 'direct-from-client', label: 'Direct From Client' },
    { value: 'other', label: 'Other' }
  ]

  public editIcon = faEdit
  public viewIcon = faEye
  public searchIcon = faSearch

  public searchTerm: string = ''
  private currentParams: any = {}
  private preRFxResultsSubscription: Subscription

  public showPreRFxAdvSearch: boolean = false

  constructor(
    private _pre_rfx: PreRfxService,
    private _admin: AdminService,
    private _router: Router, 
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.businessUnits.subscribe( businessUnits => {
        this.businessUnits = businessUnits
      }),

      this._admin.rfxCategories.subscribe( rfxCategories => {
        this.rfxCategories = rfxCategories
      }),

      this._admin.clientAgencies.subscribe( clientAgencies => {
        this.clientAgencies = clientAgencies
      }),

      this._admin.users.subscribe ( users => {
        this.users = users
      }),

      this._route.queryParams.subscribe( params => {
        this.searchTerm = params['query'] ? params['query'] : ''
        this.currentParams = params
        this.loadPreRFxResults()
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
    this.preRFxResultsSubscription.unsubscribe()
  }

  public loadPreRFxResults(): void {
    if(this.preRFxResultsSubscription) {
      this.preRFxResultsSubscription.unsubscribe()
    }
    this.preRFxResultsSubscription = this._pre_rfx.searchPreRFx(this.currentParams).subscribe( preRFxs => {
      console.log('preRfxs are: ', preRFxs)
      this.preRFxs = preRFxs
    })
  }

  public getBusinessUnitText(bu_id: string): string {
    let buObjs: BusinessUnit[] = this.businessUnits.filter( businessUnit => {
      return businessUnit.id === bu_id
    })
    return buObjs.length > 0 ? buObjs[0].name : ''
  }

  public getRFxCategoryText(rfx_cat_id: string): string {
    let catObjs: RfxCategory[] = this.rfxCategories.filter( category => {
      return category.id === rfx_cat_id
    })
    return catObjs.length > 0 ? catObjs[0].code + ' - ' + catObjs[0].display_text : ''
  }

  public getClientAgencyText(ca_id: string): string {
    let caObjs: ClientAgency[] = this.clientAgencies.filter( clientAgency => {
      return clientAgency.id === ca_id
    })
    return caObjs.length > 0 ? caObjs[0].name + ' (' + caObjs[0].type + ')' : ''
  }

  public getRFxStatusText(status: string): string {
    let statusObjs: { value: string, label: string }[] = this.preRFxStatus.filter( preRFxStatus => {
      return preRFxStatus.value === status
    })
    return statusObjs.length > 0 ? statusObjs[0].label : ''
  }

  public getRFxSourceText(source: string): string {
    let sourceObjs: { value: string, label: string }[] = this.sources.filter( rFxSource => {
      return rFxSource.value === source
    })
    return sourceObjs.length > 0 ? sourceObjs[0].label : ''
  }

  public searchPreRFx(): void {
    let queryParams = { query: this.searchTerm }
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
    })
  }
}
