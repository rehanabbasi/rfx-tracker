import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, ClientAgency } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-ca-status-modal',
  templateUrl: './ca-status-modal.component.html',
  styleUrls: ['./ca-status-modal.component.sass']
})
export class CaStatusModalComponent implements OnInit {

  public updateStatusErrorMessage: string = ''
  public updateStatusSuccessMessage: string = ''

  @Input()
  public clientAgency: ClientAgency
  
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
    let status = !this.clientAgency.active
    this._admin.updateClientAgencyStatus(this.clientAgency.id, status)
      .then( res => {
        this.updateStatusSuccessMessage = status ? 'Client Agency has been unarchived' : 'Client Agency has been archived'
        this.statusUpdated = true
      })
      .catch( error => {
        console.error('Error while updating Client Agency status: ', error)
      })
  }

  public showStatusUpdateModal(): void {
    this.updateStatusErrorMessage = ''
    this.updateStatusSuccessMessage = ''
    this.statusUpdated = false
    $('#caStatusModal').modal('show')
  }

  public closeStatusUpdateModal(): void {
    $('#caStatusModal').modal('hide')
    this.modalClosed.emit()
  }

}
