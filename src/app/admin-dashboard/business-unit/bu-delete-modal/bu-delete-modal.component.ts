import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AdminService, BusinessUnit } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-bu-delete-modal',
  templateUrl: './bu-delete-modal.component.html',
  styleUrls: ['./bu-delete-modal.component.sass']
})
export class BuDeleteModalComponent implements OnInit {

  public deleteErrorMessage: string = ''
  public deleteSuccessMessage: string = ''

  @Input()
  public buID: string
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public buDeleted: boolean = false

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showDeleteModal()
  }

  public deleteBU(): void {
    this._admin.deleteBusinessUnit(this.buID)
      .then( res => {
        this.deleteSuccessMessage = 'The Business Unit has been permanently deleted.'
        this.buDeleted = true
        // setTimeout(() => {
        //   this.closeDeleteModal()
        // }, 5000)
      })
      .catch( error => {
        console.error('Error while deleting business unit: ', error)
      })
  }

  public showDeleteModal(): void {
    this.deleteErrorMessage = ''
    this.deleteSuccessMessage = ''
    this.buDeleted = false
    $('#buDeleteModal').modal('show')
  }

  public closeDeleteModal(): void {
    $('#buDeleteModal').modal('hide')
    this.modalClosed.emit()
  }

}
