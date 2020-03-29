import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, RfxCategory } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-rc-status-modal',
  templateUrl: './rc-status-modal.component.html',
  styleUrls: ['./rc-status-modal.component.sass']
})
export class RcStatusModalComponent implements OnInit {

  public updateStatusErrorMessage: string = ''
  public updateStatusSuccessMessage: string = ''

  @Input()
  public rfxCategory: RfxCategory
  
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
    let status = !this.rfxCategory.active
    this._admin.updateRfxCategoryStatus(this.rfxCategory.id, status)
      .then( res => {
        this.updateStatusSuccessMessage = status ? 'RFx Category has been unarchived' : 'RFx Category has been archived'
        this.statusUpdated = true
      })
      .catch( error => {
        console.error('Error while updating RFx Category status: ', error)
      })
  }

  public showStatusUpdateModal(): void {
    this.updateStatusErrorMessage = ''
    this.updateStatusSuccessMessage = ''
    this.statusUpdated = false
    $('#rcStatusModal').modal('show')
  }

  public closeStatusUpdateModal(): void {
    $('#rcStatusModal').modal('hide')
    this.modalClosed.emit()
  }

}