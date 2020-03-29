import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, RfxDocumentType } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-rdt-status-modal',
  templateUrl: './rdt-status-modal.component.html',
  styleUrls: ['./rdt-status-modal.component.sass']
})
export class RdtStatusModalComponent implements OnInit {

  public updateStatusErrorMessage: string = ''
  public updateStatusSuccessMessage: string = ''

  @Input()
  public rfxDocumentType: RfxDocumentType
  
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
    let status = !this.rfxDocumentType.active
    this._admin.updateRfxDocumentTypeStatus(this.rfxDocumentType.id, status)
      .then( res => {
        this.updateStatusSuccessMessage = status ? 'RFx Document Type has been unarchived' : 'RFx Document Type has been archived'
        this.statusUpdated = true
      })
      .catch( error => {
        console.error('Error while updating RFx Document Type status: ', error)
      })
  }

  public showStatusUpdateModal(): void {
    this.updateStatusErrorMessage = ''
    this.updateStatusSuccessMessage = ''
    this.statusUpdated = false
    $('#rdtStatusModal').modal('show')
  }

  public closeStatusUpdateModal(): void {
    $('#rdtStatusModal').modal('hide')
    this.modalClosed.emit()
  }

}
