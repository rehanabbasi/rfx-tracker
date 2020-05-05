import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';

import { PreRfxService, RFxComment } from '../../shared/services/pre-rfx.service';
import { UtilsService, EmailTypes } from '../../shared/services/utils.service';

declare var $: any;

@Component({
  selector: 'app-rfx-comments-modal',
  templateUrl: './rfx-comments-modal.component.html',
  styleUrls: ['./rfx-comments-modal.component.sass']
})
export class RfxCommentsModalComponent implements OnInit {

  public errorMessage: string = ''
  public successMessage: string = ''

  @Input()
  public businessUnit: string
  
  @Input()
  public pre_rfx_data: any

  @Input()
  private currentUser: any
  
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public statusUpdated: boolean = false
  public commentText: string = ''

  constructor(
    private _pre_rfx: PreRfxService,
    private _utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.showModal()
  }

  public updateStatus(): void {
    if(!this.commentText) {
      this.errorMessage = 'Must leave a comment for searcher before you proceed.'
      return
    }

    let commentsArray: any[] = this.pre_rfx_data.commentsArray

    let commentObj: RFxComment = {
      date_time: formatDate(new Date(), 'MMM d, y h:mm a', 'en'),
      sender_id: this.currentUser.id,
      sender_name: this.currentUser.name,
      comment_text: this.commentText,
      status: this.pre_rfx_data.status
    }
    commentsArray.push(commentObj)

    this._pre_rfx.updatePreRFxStatus(this.pre_rfx_data.id, this.pre_rfx_data.status, commentsArray)
      .then( res => {
        let emailData: any = {
          "email_subject": this.getNotificationEmailSubject(),
          "approver_name": this.currentUser.name,
          "searcher_name": this.pre_rfx_data.pre_rfx_author_name,
          "pre_rfx_id": this.pre_rfx_data.id,
          "rfx_number": this.pre_rfx_data.rfx_number,
          "rfx_title": this.pre_rfx_data.title,
          "pre_rfx_status": this.getStatusLabel(this.pre_rfx_data.status),
          "approver_comments": this.commentText
        }
        this._utils.sendEmail(this.pre_rfx_data.pre_rfx_author_email, EmailTypes.PreRFxUpdatedByApprover, emailData)
          .then( (emailResponse) => {
            let notificaitonText: string = this.preRfxStatusUpdateNotificationMsg(this.pre_rfx_data.title, this.getStatusLabel(this.pre_rfx_data.status), this.pre_rfx_data.id)
            this._utils.sendSkypeNotification(notificaitonText, this.businessUnit)
              .then( (notificationResponse) => {
                this.successMessage = 'The Pre-RFx Status has been updated.'
                this.statusUpdated = true
              })
              .catch( (error) => {
                console.error('Error while sending Skype Notificaiton: ', error)
              })
          })
          .catch( (error) => {
            console.error('Error while sending email notification to the searcher: ', error)
          })        
      })
      .catch( error => {
        console.error('Error while updating Pre-RFx status: ', error)
      })
  }

  public showModal(): void {
    this.errorMessage = ''
    this.successMessage = ''
    this.statusUpdated = false
    $('#rfxCommentsModal').modal('show')
  }

  public closeModal(): void {
    $('#rfxCommentsModal').modal('hide')
    this.modalClosed.emit()
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

  public getNotificationEmailSubject(): string{
    let subject: string = ''
    switch(this.pre_rfx_data.status) {
      case 'go':
        subject = `Go - Pre-RFx titled ${this.pre_rfx_data.title} is a Go`
        break
      case 'no-go':
        subject = `No Go - Pre-RFx titled ${this.pre_rfx_data.title} is a No Go`
        break
      case 'push-back':
        subject = `Pushed Back - Pre-RFx titled ${this.pre_rfx_data.title} needs additional info`
        break
      default:
        break
    }
    return subject
  }

  private preRfxStatusUpdateNotificationMsg(title: string, status: string, preRFxId: string):string {
    return `The RFX titled *${title}* is a _${status}_. For more details visit: https://rfx-tracker.web.app/pre-rfx-view/${preRFxId} `
  }

}
