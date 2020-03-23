import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-pdt-delete-modal',
  templateUrl: './pdt-delete-modal.component.html',
  styleUrls: ['./pdt-delete-modal.component.sass']
})
export class PdtDeleteModalComponent implements OnInit {

  public deleteErrorMessage: string = ''
  public deleteSuccessMessage: string = ''

  @Input()
  public pdtID: string
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public pdtDeleted: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showDeleteModal()
  }

  public deletePDT(): void {
    this._admin.deleteProposalDocumentType(this.pdtID)
      .then( res => {
        this.deleteSuccessMessage = 'The Proposal Document Type has been permanently deleted.'
        this.pdtDeleted = true
      })
      .catch( error => {
        console.error('Error while deleting Proposal Document Type: ', error)
      })
  }

  public showDeleteModal(): void {
    this.deleteErrorMessage = ''
    this.deleteSuccessMessage = ''
    this.pdtDeleted = false
    $('#pdtDeleteModal').modal('show')
  }

  public closeDeleteModal(): void {
    $('#pdtDeleteModal').modal('hide')
    this.modalClosed.emit()
  }

}
