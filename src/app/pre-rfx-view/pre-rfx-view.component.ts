import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

import { PreRfxService, PreRFx } from '../shared/services/pre-rfx.service';
import { AdminService, BusinessUnit, RfxType, ClientAgency, RfxCategory } from '../shared/services/admin.service';

@Component({
  selector: 'app-pre-rfx-view',
  templateUrl: './pre-rfx-view.component.html',
  styleUrls: ['./pre-rfx-view.component.sass']
})
export class PreRfxViewComponent implements OnInit {
  public secHeaderIcon = faChevronRight

  private subscriptions: Subscription[] = []
  public businessUnits: BusinessUnit[] = []
  public rfxTypes: RfxType[] = []
  public clientAgencies: ClientAgency[] = []
  public rfxCategories: RfxCategory[] = []

  public preRFxStatus: {
    value: string,
    label: string
  }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'push-back', label: 'Push Back' },
    { value: 'no-go', label: 'No Go' },
    { value: 'go', label: 'Go' }
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

  public preRFxId: string
  public preRFxData: PreRFx

  constructor(
    private _pre_rfx: PreRfxService,
    private _admin: AdminService,
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
      this._admin.clientAgencies.subscribe( clientAgencies => {
        this.clientAgencies = clientAgencies
      }),
      this._admin.rfxCategories.subscribe( rfxCategories => {
        this.rfxCategories = rfxCategories
      }),
      this.route.params.subscribe( params => {
        if (params['id']) {
          this.preRFxId = params['id']
          this.loadRFxData()
        }
      })
    )
  }

  private loadRFxData(): void {
    this._pre_rfx.getPreRFxById(this.preRFxId).subscribe( preRFx => {
      this.preRFxData = preRFx
    })
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

}
