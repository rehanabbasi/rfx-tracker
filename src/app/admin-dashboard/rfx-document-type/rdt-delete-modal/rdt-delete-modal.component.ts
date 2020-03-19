import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-rdt-delete-modal',
  templateUrl: './rdt-delete-modal.component.html',
  styleUrls: ['./rdt-delete-modal.component.sass']
})
export class RdtDeleteModalComponent implements OnInit {

  public deleteErrorMessage: string = ''
  public deleteSuccessMessage: string = ''

  @Input()
  public rdtID: string
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public rdtDeleted: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showDeleteModal()
  }

  public deleteRDT(): void {
    this._admin.deleteRfxDocumentType(this.rdtID)
      .then( res => {
        this.deleteSuccessMessage = 'The RFx Document Type has been permanently deleted.'
        this.rdtDeleted = true
      })
      .catch( error => {
        console.error('Error while deleting RFx Document Type: ', error)
      })
  }

  public showDeleteModal(): void {
    this.deleteErrorMessage = ''
    this.deleteSuccessMessage = ''
    this.rdtDeleted = false
    $('#rdtDeleteModal').modal('show')
  }

  public closeDeleteModal(): void {
    $('#rdtDeleteModal').modal('hide')
    this.modalClosed.emit()
  }

}
