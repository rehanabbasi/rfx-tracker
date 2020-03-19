import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-rc-delete-modal',
  templateUrl: './rc-delete-modal.component.html',
  styleUrls: ['./rc-delete-modal.component.sass']
})
export class RcDeleteModalComponent implements OnInit {

  public deleteErrorMessage: string = ''
  public deleteSuccessMessage: string = ''

  @Input()
  public rcID: string
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public rcDeleted: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showDeleteModal()
  }

  public deleteRC(): void {
    this._admin.deleteRfxCategory(this.rcID)
      .then( res => {
        this.deleteSuccessMessage = 'The RFx Category has been permanently deleted.'
        this.rcDeleted = true
      })
      .catch( error => {
        console.error('Error while deleting RFx Category: ', error)
      })
  }

  public showDeleteModal(): void {
    this.deleteErrorMessage = ''
    this.deleteSuccessMessage = ''
    this.rcDeleted = false
    $('#rcDeleteModal').modal('show')
  }

  public closeDeleteModal(): void {
    $('#rcDeleteModal').modal('hide')
    this.modalClosed.emit()
  }

}
