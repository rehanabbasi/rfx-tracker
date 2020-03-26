import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, UserCategory } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-uc-delete-modal',
  templateUrl: './uc-delete-modal.component.html',
  styleUrls: ['./uc-delete-modal.component.sass']
})
export class UcDeleteModalComponent implements OnInit {

  public deleteErrorMessage: string = ''
  public deleteSuccessMessage: string = ''

  @Input()
  public userCategory: UserCategory
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public ucDeleted: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showDeleteModal()
  }

  public deleteUC(): void {
    this._admin.deleteUserCategory(this.userCategory.id)
      .then( res => {
        this.deleteSuccessMessage = 'User - RFx Category has been permanently deleted.'
        this.ucDeleted = true
      })
      .catch( error => {
        console.error('Error while deleting User - RFx Category: ', error)
      })
  }

  public showDeleteModal(): void {
    this.deleteErrorMessage = ''
    this.deleteSuccessMessage = ''
    this.ucDeleted = false
    $('#ucDeleteModal').modal('show')
  }

  public closeDeleteModal(): void {
    $('#ucDeleteModal').modal('hide')
    this.modalClosed.emit()
  }

}