import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, BusinessUnit } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-ca-delete-modal',
  templateUrl: './ca-delete-modal.component.html',
  styleUrls: ['./ca-delete-modal.component.sass']
})
export class CaDeleteModalComponent implements OnInit {

  public deleteErrorMessage: string = ''
  public deleteSuccessMessage: string = ''

  @Input()
  public caID: string
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public caDeleted: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showDeleteModal()
  }

  public deleteCA(): void {
    this._admin.deleteClientAgency(this.caID)
      .then( res => {
        this.deleteSuccessMessage = 'The Client Agency has been permanently deleted.'
        this.caDeleted = true
      })
      .catch( error => {
        console.error('Error while deleting Client Agency: ', error)
      })
  }

  public showDeleteModal(): void {
    this.deleteErrorMessage = ''
    this.deleteSuccessMessage = ''
    this.caDeleted = false
    $('#caDeleteModal').modal('show')
  }

  public closeDeleteModal(): void {
    $('#caDeleteModal').modal('hide')
    this.modalClosed.emit()
  }

}
