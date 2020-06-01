import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';

import { PreRfxService, RFxComment, PreRFx } from '../../shared/services/pre-rfx.service';
import { AdminService, BusinessUnit, User } from '../../shared/services/admin.service';
import { UtilsService, EmailTypes } from '../../shared/services/utils.service';

declare var $: any;

@Component({
  selector: 'app-rfx-bulk-status-update-modal',
  templateUrl: './rfx-bulk-status-update-modal.component.html',
  styleUrls: ['./rfx-bulk-status-update-modal.component.sass']
})
export class RfxBulkStatusUpdateModalComponent implements OnInit, OnDestroy {

  public errorMessage: string = ''
  public successMessage: string = ''

  private authorObjSubscription: Subscription

  @Input()
  public businessUnits: BusinessUnit[]
  
  @Input()
  public selected_pre_rfx_ids: string[]

  @Input()
  public pre_rfx_items: PreRFx[]

  @Input()
  public status: string

  @Input()
  private currentUser: any
  
  @Output() 
  modalClosed: EventEmitter<any> = new EventEmitter()

  public statusUpdated: boolean = false
  public commentText: string = ''

  constructor(
    private _pre_rfx: PreRfxService,
    private _admin: AdminService,
    private _utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.showModal()
  }

  ngOnDestroy() {
    this.authorObjSubscription.unsubscribe()
  }

  public updateStatus(): void {
    if(!this.commentText) {
      this.errorMessage = 'Must leave a comment for searcher before you proceed.'
      return
    }

    let currentSelectedIndex: number = 1
    for(let preRFxId of this.selected_pre_rfx_ids) {
      let pre_rfx_data: PreRFx = this.getPreRFxDataById(preRFxId)
      let commentsArray: any[] = pre_rfx_data.rfx_status_comments && pre_rfx_data.rfx_status_comments.length > 0 ? pre_rfx_data.rfx_status_comments : []
      
      let commentObj: RFxComment = {
        date_time: formatDate(new Date(), 'MMM d, y h:mm a', 'en'),
        sender_id: this.currentUser.id,
        sender_name: this.currentUser.name,
        comment_text: this.commentText,
        status: this.status
      }
      commentsArray.push(commentObj)

      this._pre_rfx.updatePreRFxStatus(pre_rfx_data.id, this.status, commentsArray)
        .then( res => {

          if(this.authorObjSubscription) {
            this.authorObjSubscription.unsubscribe()
          }
          this.authorObjSubscription = this._admin.getUsersById(pre_rfx_data.created_by_user_id).subscribe(
            authorObj => {
              let emailData: any = {
                "email_subject": this.getNotificationEmailSubject(pre_rfx_data.title),
                "approver_name": this.currentUser.name,
                "searcher_name": authorObj.name,
                "pre_rfx_id": pre_rfx_data.id,
                "rfx_number": pre_rfx_data.rfx_number,
                "rfx_title": pre_rfx_data.title,
                "pre_rfx_status": this.getStatusLabel(this.status),
                "approver_comments": this.commentText
              }
              this._utils.sendEmail(authorObj.email, EmailTypes.PreRFxUpdatedByApprover, emailData)
                .then( (emailResponse) => {
                  let notificaitonText: string = this.preRfxStatusUpdateNotificationMsg(pre_rfx_data.title, pre_rfx_data.client_agency_name, pre_rfx_data.id)
                  this._utils.sendSkypeNotification(notificaitonText, this.getBusinessUnitText(pre_rfx_data.bu_id))
                    .then( (notificationResponse) => {
                      this.successMessage = `Pre-RFx Status Update: ${currentSelectedIndex} of ${this.selected_pre_rfx_ids.length} Completed.`
                      if(currentSelectedIndex === this.selected_pre_rfx_ids.length){
                        this.statusUpdated = true
                      } else {
                        currentSelectedIndex ++
                      }
                    })
                    .catch( (error) => {
                      console.error('Error while sending Skype Notificaiton: ', error)
                    })
                })
                .catch( (error) => {
                  console.error('Error while sending email notification to the searcher: ', error)
                })
            },
            error => {
              console.error('Error while fetching Pre-RFx author info: ', error)
            })       
        })
        .catch( error => {
          console.error('Error while updating Pre-RFx status: ', error)
        })
    }
  }

  private getPreRFxDataById(id: string): PreRFx {
    return this.pre_rfx_items.filter( item => {
      return item.id === id
    })[0]
  }

  private getBusinessUnitText(bu_id: string): string {
    let buObjs: BusinessUnit[] = this.businessUnits.filter( businessUnit => {
      return businessUnit.id === bu_id
    })
    return buObjs.length > 0 ? buObjs[0].name : ''
  }

  public showModal(): void {
    this.errorMessage = ''
    this.successMessage = ''
    this.statusUpdated = false
    $('#rfxBulkStatusUpdateModal').modal('show')
  }

  public closeModal(): void {
    $('#rfxBulkStatusUpdateModal').modal('hide')
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

  public getNotificationEmailSubject(title: string): string{
    let subject: string = ''
    switch(this.status) {
      case 'go':
        subject = `Go - Pre-RFx titled ${title} is a Go`
        break
      case 'no-go':
        subject = `No Go - Pre-RFx titled ${title} is a No Go`
        break
      case 'push-back':
        subject = `Pushed Back - Pre-RFx titled ${title} needs additional info`
        break
      default:
        break
    }
    return subject
  }

  private preRfxStatusUpdateNotificationMsg(title: string, clientAgency: string, preRFxId: string):string {
    let notificationText: string = ''
    switch(this.status) {
      case 'go':
        // notificationText = `*${title}* from _${clientAgency}_ is a *Go*. For more details visit: https://rfx-tracker.web.app/pre-rfx-view/${preRFxId} ` // DEV
        notificationText = `*${title}* from _${clientAgency}_ is a *Go*. For more details visit: https://rfx-tracker-prod.web.app/pre-rfx-view/${preRFxId} ` // PROD
        break
      case 'no-go':
        // notificationText = `*${title}* from _${clientAgency}_ is a *No-Go*. For more details visit: https://rfx-tracker.web.app/pre-rfx-view/${preRFxId} ` // DEV
        notificationText = `*${title}* from _${clientAgency}_ is a *No-Go*. For more details visit: https://rfx-tracker-prod.web.app/pre-rfx-view/${preRFxId} ` // PROD
        break
      case 'push-back':
        // notificationText = `_${this.currentUser.name}_ *PUSHED BACK* RFx Titled, *${title}* from _${clientAgency}_ that requires SOURCER's Review. For more details visit: https://rfx-tracker.web.app/pre-rfx-view/${preRFxId} ` // DEV
        notificationText = `_${this.currentUser.name}_ *PUSHED BACK* RFx Titled, *${title}* from _${clientAgency}_ that requires SOURCER's Review. For more details visit: https://rfx-tracker-prod.web.app/pre-rfx-view/${preRFxId} ` // PROD
        break
      default:
        break
    }
    return notificationText
  }

}
