import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

import { PreRfxService, PreRFx } from '../shared/services/pre-rfx.service';
import { AdminService, BusinessUnit, RfxType, RfxCategory, User } from '../shared/services/admin.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-pre-rfx-view',
  templateUrl: './pre-rfx-view.component.html',
  styleUrls: ['./pre-rfx-view.component.sass']
})
export class PreRfxViewComponent implements OnInit, OnDestroy {
  public secHeaderIcon = faChevronRight

  private subscriptions: Subscription[] = []
  public businessUnits: BusinessUnit[] = []
  public rfxTypes: RfxType[] = []
  public rfxCategories: RfxCategory[] = []

  public preRFxStatus: {
    value: string,
    label: string
  }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'push-back', label: 'Pushed Back' },
    { value: 'no-go', label: 'No Go' },
    { value: 'go', label: 'Go' },
    { value: 'draft', label: 'Draft' }
  ]

  public sources: {
    value: string,
    label: string
  }[] = [
    { value: 'bid-main', label: 'Bid Main' },
    { value: 'my-bid-match', label: 'My Bid Match' },
    { value: 'direct-from-client', label: 'Direct From Client' },
    { value: 'other', label: 'Other' }
  ]

  // For section expand/collapse
  public showBasicInfoSec: boolean = true
  public showDetailedInfoSec: boolean = true
  public showBuyerInfoSec: boolean = true
  public showRFxCommentSec: boolean = true

  public preRFxId: string
  public preRFxData: PreRFx

  public currentUser: User
  public preRFxStatusUpdateData: any
  private authorObj: User

  constructor(
    private _pre_rfx: PreRfxService,
    private _admin: AdminService,
    private _auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.businessUnits.subscribe( businessUnits => {
        this.businessUnits = businessUnits
      }),
      this._admin.rfxTypes.subscribe( rfxTypes => {
        this.rfxTypes = rfxTypes
      }),
      this._admin.rfxCategories.subscribe( rfxCategories => {
        this.rfxCategories = rfxCategories
      }),
      this.route.params.subscribe( params => {
        if (params['id']) {
          this.preRFxId = params['id']
          this.loadRFxData()
        }
      }),
      this._auth.currentUser$.subscribe( currentUserArray => {
        if( currentUserArray.length > 0) {
          this.currentUser = currentUserArray[0]
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }

  private loadRFxData(): void {
    this._pre_rfx.getPreRFxById(this.preRFxId).subscribe( preRFx => {
      this.preRFxData = preRFx
      console.log('pre RFx data: ', this.preRFxData)
      this.loadAuthorData()
    })
  }

  private loadAuthorData(): void {
    if(this.preRFxData.created_by_user_id) {
      this._admin.getUsersById(this.preRFxData.created_by_user_id).subscribe( (userObj) => {
        this.authorObj = userObj
      })
    }
  }

  public getBusinessUnitText(bu_id: string): string {
    let buObjs: BusinessUnit[] = this.businessUnits.filter( businessUnit => {
      return businessUnit.id === bu_id
    })
    return buObjs.length > 0 ? buObjs[0].name : ''
  }

  public getRFxTypeText(rfx_type_id: string): string {
    let typeObjs: RfxType[] = this.rfxTypes.filter( types => {
      return types.id === rfx_type_id
    })
    return typeObjs.length > 0 ? typeObjs[0].code + ' - ' + typeObjs[0].display_text : ''
  }
  
  public getRFxCategoryText(rfx_cat_id: string): string {
    let catObjs: RfxCategory[] = this.rfxCategories.filter( category => {
      return category.id === rfx_cat_id
    })
    return catObjs.length > 0 ? catObjs[0].code + ' - ' + catObjs[0].display_text : ''
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

  public updatePreRFxStatus(status: string): void {
    let statusUpdateData = {
      id: this.preRFxData.id,
      author_id: this.preRFxData.created_by_user_id,
      rfx_number: this.preRFxData.rfx_number,
      title: this.preRFxData.title,
      clientAgency: this.preRFxData.client_agency_name,
      pre_rfx_author_name: this.authorObj.name,
      pre_rfx_author_email: this.authorObj.email,
      status: status,
      commentsArray: this.preRFxData.rfx_status_comments && this.preRFxData.rfx_status_comments.length > 0 ? this.preRFxData.rfx_status_comments : []
    }
    this.preRFxStatusUpdateData = statusUpdateData
  }

  public hasApproveAccess(): boolean {
    if(this.currentUser){
      return this.currentUser['view_access'].indexOf('pre_rfx_approve') > -1
    } else {
      return false
    }
  }

  public hasWriteAccess(): boolean {
    if(this.currentUser){
      return this.currentUser['view_access'].indexOf('pre_rfx_write') > -1
    } else {
      return false
    }
  }

}
