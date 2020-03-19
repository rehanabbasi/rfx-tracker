import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-rt-delete-modal',
  templateUrl: './rt-delete-modal.component.html',
  styleUrls: ['./rt-delete-modal.component.sass']
})
export class RtDeleteModalComponent implements OnInit {

  public deleteErrorMessage: string = ''
  public deleteSuccessMessage: string = ''

  @Input()
  public rtID: string
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public rtDeleted: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showDeleteModal()
  }

  public deleteRT(): void {
    this._admin.deleteRfxType(this.rtID)
      .then( res => {
        this.deleteSuccessMessage = 'The RFx Type has been permanently deleted.'
        this.rtDeleted = true
      })
      .catch( error => {
        console.error('Error while deleting RFx Type: ', error)
      })
  }

  public showDeleteModal(): void {
    this.deleteErrorMessage = ''
    this.deleteSuccessMessage = ''
    this.rtDeleted = false
    $('#rtDeleteModal').modal('show')
  }

  public closeDeleteModal(): void {
    $('#rtDeleteModal').modal('hide')
    this.modalClosed.emit()
  }

}
