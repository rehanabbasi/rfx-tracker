import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, UserBusinessUnit } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-ubu-delete-modal',
  templateUrl: './ubu-delete-modal.component.html',
  styleUrls: ['./ubu-delete-modal.component.sass']
})
export class UbuDeleteModalComponent implements OnInit {

  public deleteErrorMessage: string = ''
  public deleteSuccessMessage: string = ''

  @Input()
  public userBusinessUnit: UserBusinessUnit
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public ubuDeleted: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showDeleteModal()
  }

  public deleteUBU(): void {
    this._admin.deleteUserBusinessUnit(this.userBusinessUnit.id)
      .then( res => {
        this.deleteSuccessMessage = 'User - Business Unit has been permanently deleted.'
        this.ubuDeleted = true
      })
      .catch( error => {
        console.error('Error while deleting User - Business Unit: ', error)
      })
  }

  public showDeleteModal(): void {
    this.deleteErrorMessage = ''
    this.deleteSuccessMessage = ''
    this.ubuDeleted = false
    $('#ubuDeleteModal').modal('show')
  }

  public closeDeleteModal(): void {
    $('#ubuDeleteModal').modal('hide')
    this.modalClosed.emit()
  }

}