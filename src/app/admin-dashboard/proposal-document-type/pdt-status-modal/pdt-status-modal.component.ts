import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, ProposalDocumentType } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-pdt-status-modal',
  templateUrl: './pdt-status-modal.component.html',
  styleUrls: ['./pdt-status-modal.component.sass']
})
export class PdtStatusModalComponent implements OnInit {

  public updateStatusErrorMessage: string = ''
  public updateStatusSuccessMessage: string = ''

  @Input()
  public proposalDocumentType: ProposalDocumentType
  
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
    let status = !this.proposalDocumentType.active
    this._admin.updateProposalDocumentTypeStatus(this.proposalDocumentType.id, status)
      .then( res => {
        this.updateStatusSuccessMessage = status ? 'Proposal Document Type has been unarchived' : 'Proposal Document Type has been archived'
        this.statusUpdated = true
      })
      .catch( error => {
        console.error('Error while updating Proposal Document Type status: ', error)
      })
  }

  public showStatusUpdateModal(): void {
    this.updateStatusErrorMessage = ''
    this.updateStatusSuccessMessage = ''
    this.statusUpdated = false
    $('#pdtStatusModal').modal('show')
  }

  public closeStatusUpdateModal(): void {
    $('#pdtStatusModal').modal('hide')
    this.modalClosed.emit()
  }

}