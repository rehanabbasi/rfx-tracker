import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, RfxType } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-rt-status-modal',
  templateUrl: './rt-status-modal.component.html',
  styleUrls: ['./rt-status-modal.component.sass']
})
export class RtStatusModalComponent implements OnInit {

  public updateStatusErrorMessage: string = ''
  public updateStatusSuccessMessage: string = ''

  @Input()
  public rfxType: RfxType
  
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
    let status = !this.rfxType.active
    this._admin.updateRfxTypeStatus(this.rfxType.id, status)
      .then( res => {
        this.updateStatusSuccessMessage = status ? 'RFx Type has been unarchived' : 'RFx Type has been archived'
        this.statusUpdated = true
      })
      .catch( error => {
        console.error('Error while updating RFx Type status: ', error)
      })
  }

  public showStatusUpdateModal(): void {
    this.updateStatusErrorMessage = ''
    this.updateStatusSuccessMessage = ''
    this.statusUpdated = false
    $('#rtStatusModal').modal('show')
  }

  public closeStatusUpdateModal(): void {
    $('#rtStatusModal').modal('hide')
    this.modalClosed.emit()
  }

}
