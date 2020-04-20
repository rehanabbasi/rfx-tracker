import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-pre-rfx-add-comments-modal',
  templateUrl: './pre-rfx-add-comments-modal.component.html',
  styleUrls: ['./pre-rfx-add-comments-modal.component.sass']
})
export class PreRfxAddCommentsModalComponent implements OnInit {

  @Input()
  public pre_rfx_data: any
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public commentText: string = ''

  constructor(
  ) { }

  ngOnInit(): void {
    this.showModal()
  }

  public proceedWithSave(): void {
    $('#preRFxAddCommentsModal').modal('hide')
    this.modalClosed.emit({ proceed: true, comment_text: this.commentText, pre_rfx_data: this.pre_rfx_data })
  }

  public showModal(): void {
    $('#preRFxAddCommentsModal').modal('show')
  }

  public closeModal(): void {
    $('#preRFxAddCommentsModal').modal('hide')
    this.modalClosed.emit({ proceed: false })
  }

  public getStatusLabel(status: string): string {
    let label = ''
    switch(status) {
      case 'go':
        label = 'Go'
        break
      case 'no-go':
        label = 'No Go'
        break
      case 'push-back':
        label = 'Push Back'
        break
      case 'pending':
        label = 'Pending'
        break
      case 'draft':
        label = 'Draft'
        break
      default:
        break
    }
    return label
  }

}
