import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, BusinessUnit } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-bu-status-modal',
  templateUrl: './bu-status-modal.component.html',
  styleUrls: ['./bu-status-modal.component.sass']
})
export class BuStatusModalComponent implements OnInit {

  public updateStatusErrorMessage: string = ''
  public updateStatusSuccessMessage: string = ''

  @Input()
  public businessUnit: BusinessUnit
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public statusUpdated: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showStatusUpdateModal()
  }

  public updateStatus(): void {
    let status = !this.businessUnit.active
    this._admin.updateBusinessUnitStatus(this.businessUnit.id, status)
      .then( res => {
        this.updateStatusSuccessMessage = status ? 'Business Unit has been unarchived' : 'Business Unit has been archived'
        this.statusUpdated = true
      })
      .catch( error => {
        console.error('Error while updating Business Unit status: ', error)
      })
  }

  public showStatusUpdateModal(): void {
    this.updateStatusErrorMessage = ''
    this.updateStatusSuccessMessage = ''
    this.statusUpdated = false
    $('#buStatusModal').modal('show')
  }

  public closeStatusUpdateModal(): void {
    $('#buStatusModal').modal('hide')
    this.modalClosed.emit()
  }

}
