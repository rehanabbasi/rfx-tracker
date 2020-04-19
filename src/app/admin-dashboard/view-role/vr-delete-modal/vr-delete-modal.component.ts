import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, ViewRole, UserRole } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-vr-delete-modal',
  templateUrl: './vr-delete-modal.component.html',
  styleUrls: ['./vr-delete-modal.component.sass']
})
export class VrDeleteModalComponent implements OnInit {

  public deleteErrorMessage: string = ''
  public deleteSuccessMessage: string = ''

  @Input()
  public viewRole: UserRole
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public vrDeleted: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showDeleteModal()
  }

  public deleteVR(): void {
    this._admin.deleteViewRole(this.viewRole.id)
      .then( res => {
        this.deleteSuccessMessage = 'View Access by Role has been permanently deleted.'
        this.vrDeleted = true
      })
      .catch( error => {
        console.error('Error while deleting View Access by Role: ', error)
      })
  }

  public showDeleteModal(): void {
    this.deleteErrorMessage = ''
    this.deleteSuccessMessage = ''
    this.vrDeleted = false
    $('#vrDeleteModal').modal('show')
  }

  public closeDeleteModal(): void {
    $('#vrDeleteModal').modal('hide')
    this.modalClosed.emit()
  }

}
