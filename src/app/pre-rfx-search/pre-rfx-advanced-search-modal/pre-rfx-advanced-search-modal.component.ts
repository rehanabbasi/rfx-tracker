import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';

import { AdminService, BusinessUnit, RfxCategory, User } from '../../shared/services/admin.service';
import { PreRfxService } from '../../shared/services/pre-rfx.service';

declare var $: any;

@Component({
  selector: 'app-pre-rfx-advanced-search-modal',
  templateUrl: './pre-rfx-advanced-search-modal.component.html',
  styleUrls: ['./pre-rfx-advanced-search-modal.component.sass']
})
export class PreRfxAdvancedSearchModalComponent implements OnInit {
  
  @Input()
  public businessUnits: BusinessUnit[]

  @Input()
  public rfxCategories: RfxCategory[]

  @Input()
  public preRFxStatus: { value: string, label: string }[]

  @Input()
  public users: User[]

  @Output() 
  advSearchModalClosed: EventEmitter<any> = new EventEmitter()

  public removeIcon = faTimesCircle

  public advSearchFields: AdvSearchQueryField[] = [
    { label: 'Choose an RFx Field', name: '', type: 'text' },
    { label: 'Business Unit', name: 'bu_id', type: 'dropdown' },
    { label: 'RFx Number', name: 'rfx_number', type: 'text' },
    { label: 'RFx Category', name: 'rfx_category_id', type: 'dropdown' },
    { label: 'RFx Title', name: 'title', type: 'text' },
    { label: 'RFx Client Agency', name: 'client_agency_name', type: 'text' },
    { label: 'Pre-RFx Status', name: 'status', type: 'dropdown' },
    { label: 'Created by', name: 'created_by_user_id', type: 'dropdown' },
    { label: 'Created on', name: 'created_on_date', type: 'date' }
  ]

  public advSearchQueries: AdvSearchQuery[] = [
    { field: this.advSearchFields[0], fieldValue: ''}
  ]

  constructor(
    private _router: Router, 
    private _route: ActivatedRoute,
    private _admin: AdminService,
    private _pre_rfx: PreRfxService
  ) { }

  ngOnInit(): void {
    // Set controlled list items for each of the advance search dropdown fields
    this.advSearchFields = this.advSearchFields.map( field => {
      switch( field.name ){
        case 'bu_id':
          field.controlled_list_items = this.businessUnits
          break
        case 'rfx_category_id':
          field.controlled_list_items = this.rfxCategories
          break
        case 'status':
          field.controlled_list_items = this.preRFxStatus
          break
        case 'created_by_user_id':
          field.controlled_list_items = this.users
          break
        default:
          break
      }
      return field
    })

    this.showAdvancedSearchModal()
  }

  public getValueDropDownItemLabel(fieldName: string, item: any): string {
    let label: string = ''
    switch(fieldName) {
      case 'bu_id':
        label = item.name
        break
      case 'rfx_category_id':
        label = item.code + ' - ' + item.display_text
        break
      case 'status':
        label = item.label
        break
      case 'created_by_user_id':
        label = item.name
        break
      default:
        break
    }
    return label
  }

  public advSearchFieldChanged(query: AdvSearchQuery): void {
    query.fieldValue = ''
  }

  public addNewAdvSearchQuery(): void {
    this.advSearchQueries.push(
      { field: this.advSearchFields[0], fieldValue: ''}
    )
  }

  public removeAdvSearchQuery(index: number): void {
    this.advSearchQueries.splice(index, 1)
  }

  public executeAdvSearch(): void {
    let queryParams = {}
    for(let query of this.advSearchQueries) {
      if( query.field.name ) {
        queryParams[query.field.name] = query.fieldValue
      }
    }

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
    })

    this.closeAdvancedSearchModal()
  }

  public resetAdvSearchQueries(): void {
    this.advSearchQueries = [ { field: this.advSearchFields[0], fieldValue: ''} ]
  }

  public showAdvancedSearchModal() {
    $('#advancedSearchModal').modal('show')
  }

  public closeAdvancedSearchModal() {
    $('#advancedSearchModal').modal('hide')
    this.advSearchModalClosed.emit()
  }

}

export interface AdvSearchQueryField {
  label: string,
  name: string,
  type: string,
  controlled_list_items?: any[]
}

export interface AdvSearchQuery{
  field: AdvSearchQueryField,
  fieldValue: string
}
