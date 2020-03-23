import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, UserRole } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-ur-status-modal',
  templateUrl: './ur-status-modal.component.html',
  styleUrls: ['./ur-status-modal.component.sass']
})
export class UrStatusModalComponent implements OnInit {

  public updateStatusErrorMessage: string = ''
  public updateStatusSuccessMessage: string = ''

  @Input()
  public userRole: UserRole
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public urStatusUpdated: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showStatusUpdateModal()
  }

  public updateStatus(): void {
    let status = !this.userRole.active
    this._admin.updateUserRoleStatus(this.userRole.id, status)
      .then( res => {
        this.updateStatusSuccessMessage = status ? 'User Role has been unarchived' : 'User Role has been archived'
        this.urStatusUpdated = true
      })
      .catch( error => {
        console.error('Error while updating User Role status: ', error)
      })
  }

  public showStatusUpdateModal(): void {
    this.updateStatusErrorMessage = ''
    this.updateStatusSuccessMessage = ''
    this.urStatusUpdated = false
    $('#urStatusModal').modal('show')
  }

  public closeStatusUpdateModal(): void {
    $('#urStatusModal').modal('hide')
    this.modalClosed.emit()
  }

}