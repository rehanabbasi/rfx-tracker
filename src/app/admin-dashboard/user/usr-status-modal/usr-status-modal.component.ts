import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, User } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-usr-status-modal',
  templateUrl: './usr-status-modal.component.html',
  styleUrls: ['./usr-status-modal.component.sass']
})
export class UsrStatusModalComponent implements OnInit {

  public updateStatusErrorMessage: string = ''
  public updateStatusSuccessMessage: string = ''

  @Input()
  public user: User
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public usrStatusUpdated: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showStatusUpdateModal()
  }

  public updateStatus(): void {
    let status = !this.user.active
    this._admin.updateUserStatus(this.user.id, status)
      .then( res => {
        this.updateStatusSuccessMessage = status ? 'User has been unarchived' : 'User has been archived'
        this.usrStatusUpdated = true
      })
      .catch( error => {
        console.error('Error while updating User status: ', error)
      })
  }

  public showStatusUpdateModal(): void {
    this.updateStatusErrorMessage = ''
    this.updateStatusSuccessMessage = ''
    this.usrStatusUpdated = false
    $('#usrStatusModal').modal('show')
  }

  public closeStatusUpdateModal(): void {
    $('#usrStatusModal').modal('hide')
    this.modalClosed.emit()
  }

}
