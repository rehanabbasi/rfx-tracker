import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

import { PreRfxService, PreRFx, Upload, RFxComment } from '../shared/services/pre-rfx.service';
import { AdminService, BusinessUnit, RfxType, ClientAgency, RfxCategory, User, UserBusinessUnit } from '../shared/services/admin.service';
import { AuthService } from '../shared/services/auth.service';
import { UtilsService, EmailTypes } from '../shared/services/utils.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pre-rfx-add',
  templateUrl: './pre-rfx-add.component.html',
  styleUrls: ['./pre-rfx-add.component.sass']
})
export class PreRfxAddComponent implements OnInit, OnDestroy {
  public secHeaderIcon = faChevronRight
  private reqFieldsMap: any = {
    'bu_id': 'Business Unit',
    'rfx_number': 'RFx Number',
    'title': 'RFx Title',
    'rfx_type_id': 'RFx Type',
    'rfx_category_id': 'RFx Category',
    'rfx_due_date_time': 'RFx Due Date & Time',
    'rfx_scope': 'RFx Scope',
    'client_agency_id': 'RFx Client Agency/Company Name',
    'state_province': 'State/Province',
    'submission_format': 'Submission Format',
    'source': 'Source'
  }
  
  public preRFxForm = this._fb.group({
    bu_id: ['', [ Validators.required ]],
    rfx_number: ['', [ Validators.required ]],
    title: ['', [ Validators.required ]],
    rfx_type_id: ['', [ Validators.required ]],
    rfx_category_id: ['', [ Validators.required ]],
    rfx_pub_date: [''],
    rfx_due_date_time: ['', [ Validators.required ]],
    rfx_scope: ['', [ Validators.required ]],
    rfx_min_qualifications: [''],
    rfx_comments: [''],
    rfx_constraints: this._fb.group({
      local_vendors: this._fb.group({
        value: [false, [ Validators.required ]],
        text: ['']
      }),
      certification_license:  this._fb.group({
        value: [false, [ Validators.required ]],
        text: ['']
      }),
      financial_conditions:  this._fb.group({
        value: [false, [ Validators.required ]],
        text: ['']
      }),
      minority_certified:  this._fb.group({
        value: [false, [ Validators.required ]],
        text: ['']
      }),
      other_constraints:  this._fb.group({
        value: [false, [ Validators.required ]],
        text: ['']
      })
    }),
    client_agency_id: ['', [ Validators.required ]],
    state_province: ['', [ Validators.required ]],
    pre_proposal_conf: [false, [ Validators.required ]],
    pre_proposal_conf_date: [''],
    submission_format: ['', [ Validators.required ]],
    source: ['', [ Validators.required ]],
    source_url: [''],
    rfx_third_party_src_url: [''],
    buyer: this._fb.group({
      name: [''],
      title: [''],
      contact: [''],
      email: ['', [ Validators.email ]]
    })
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''

  private subscriptions: Subscription[] = []
  public businessUnits: BusinessUnit[] = []
  public rfxTypes: RfxType[] = []
  public clientAgencies: ClientAgency[] = []
  public rfxCategories: RfxCategory[] = []

  public preRFxStatus: {
    value: string,
    label: string
  }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'push-back', label: 'Pushed Back' },
    { value: 'no-go', label: 'No Go' },
    { value: 'go', label: 'Go' },
    { value: 'draft', label: 'Draft' }
  ]

  public submissionFormats: string[] = [ 'Online', 'Email', 'Mail' ]
  public sources: {
    value: string,
    label: string
  }[] = [
    { value: 'bid-main', label: 'Bid Main' },
    { value: 'my-bid-match', label: 'My Bid Match' },
    { value: 'direct-from-client', label: 'Direct From Client' },
    { value: 'other', label: 'Other' }
  ]

  public selectedAttachmentFile: File
  public fileUpload: Upload

  public savingForm: boolean = false
  public savingDraft: boolean = false

  // For section expand/collapse
  public showBasicInfoSec: boolean = true
  public showDetailedInfoSec: boolean = true
  public showBuyerInfoSec: boolean = true
  public showRFxCommentSec: boolean = true

  public preRFxId: string
  public preRFxEdit: PreRFx
  public preRFxPendingStatusData: PreRFx

  public currentUser: User

  public editDisabled: boolean = false
  public editDisabledMessage: string = ''

  private approverEmails: string[] = []

  private currentUserBusinessUnitId: string = ''
  private currentUserCategoryId: string = ''
  
  constructor(
    private _pre_rfx: PreRfxService,
    private _admin: AdminService,
    private _auth: AuthService,
    private _utils: UtilsService,
    private _fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.businessUnits.subscribe( businessUnits => {
        this.businessUnits = businessUnits
      }),
      this._admin.rfxTypes.subscribe( rfxTypes => {
        this.rfxTypes = rfxTypes
      }),
      this._admin.clientAgencies.subscribe( clientAgencies => {
        this.clientAgencies = clientAgencies
      }),
      this._admin.rfxCategories.subscribe( rfxCategories => {
        this.rfxCategories = rfxCategories
      }),
      this.route.params.subscribe( params => {
        if (params['id']) {
          this.preRFxId = params['id']
          this.loadRFxData()
        }
      }),
      this._auth.currentUser$.subscribe( currentUserArray => {
        if( currentUserArray.length > 0) {
          this.currentUser = currentUserArray[0]
          this.loadUserBusinessUnit()
          this.loadUserCategory()
        }
      }),
      this._admin.getPreRFxApprovalRoles().pipe(
        switchMap( roles => {
          if (roles) {
            let role_ids = roles.map( role => role.id)
            return this._admin.getUsersByIds(role_ids)
          }
        })
      ).subscribe( (users) => {
        this.approverEmails = users.map( user => user.email)
      })
      
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }
  
  private loadUserBusinessUnit(): void{
    this.subscriptions.push(
      this._admin.getUserBusinessUnit(this.currentUser.id).subscribe( (userBusinessUnits) => {
        if(userBusinessUnits && userBusinessUnits.length > 0) {
          this.currentUserBusinessUnitId = userBusinessUnits[0].bu_ids && userBusinessUnits[0].bu_ids.length > 0 ? userBusinessUnits[0].bu_ids[0] : ''
          if(!this.preRFxId) {
            this.preRFxForm.controls['bu_id'].setValue(this.currentUserBusinessUnitId)
          }
        } 
      })
    )
  }

  private loadUserCategory(): void {
    this.subscriptions.push(
      this._admin.getUserCategories(this.currentUser.id).subscribe( (userCategories) => {
        if(userCategories && userCategories.length > 0) {
          this.currentUserCategoryId = userCategories[0].cat_ids && userCategories[0].cat_ids.length > 0 ? userCategories[0].cat_ids[0] : ''
          if(!this.preRFxId) {
            this.preRFxForm.controls['rfx_category_id'].setValue(this.currentUserCategoryId)
          }
        }
      })
    )
  }

  private loadRFxData(): void {
    this._pre_rfx.getPreRFxById(this.preRFxId).subscribe( preRFx => {
      this.preRFxEdit = preRFx
      setTimeout(()=> {
        this.preRFxForm.controls['bu_id'].setValue(this.preRFxEdit.bu_id)
        this.preRFxForm.controls['rfx_number'].setValue(this.preRFxEdit.rfx_number)
        this.preRFxForm.controls['title'].setValue(this.preRFxEdit.title)
        // this.preRFxForm.controls['status'].setValue(this.preRFxEdit.status)

        this.preRFxForm.controls['rfx_type_id'].setValue(this.preRFxEdit.rfx_type_id)
        this.preRFxForm.controls['rfx_category_id'].setValue(this.preRFxEdit.rfx_category_id)
        this.preRFxForm.controls['rfx_pub_date'].setValue(this.preRFxEdit.rfx_pub_date)
        this.preRFxForm.controls['rfx_due_date_time'].setValue(this.preRFxEdit.rfx_due_date_time)

        this.preRFxForm.controls['rfx_scope'].setValue(this.preRFxEdit.rfx_scope)
        this.preRFxForm.controls['rfx_min_qualifications'].setValue(this.preRFxEdit.rfx_min_qualifications)
        this.preRFxForm.controls['rfx_comments'].setValue(this.preRFxEdit.rfx_comments)

        this.preRFxForm.controls['client_agency_id'].setValue(this.preRFxEdit.client_agency_id)
        this.preRFxForm.controls['state_province'].setValue(this.preRFxEdit.state_province)

        this.preRFxForm.controls['rfx_constraints']['controls']['local_vendors']['controls'].value.setValue(this.preRFxEdit.rfx_constraints.local_vendors.value)
        this.preRFxForm.controls['rfx_constraints']['controls']['local_vendors']['controls'].text.setValue(this.preRFxEdit.rfx_constraints.local_vendors.text)
        this.preRFxForm.controls['rfx_constraints']['controls']['certification_license']['controls'].value.setValue(this.preRFxEdit.rfx_constraints.certification_license.value)
        this.preRFxForm.controls['rfx_constraints']['controls']['certification_license']['controls'].text.setValue(this.preRFxEdit.rfx_constraints.certification_license.text)
        this.preRFxForm.controls['rfx_constraints']['controls']['financial_conditions']['controls'].value.setValue(this.preRFxEdit.rfx_constraints.financial_conditions.value)
        this.preRFxForm.controls['rfx_constraints']['controls']['financial_conditions']['controls'].text.setValue(this.preRFxEdit.rfx_constraints.financial_conditions.text)
        this.preRFxForm.controls['rfx_constraints']['controls']['minority_certified']['controls'].value.setValue(this.preRFxEdit.rfx_constraints.minority_certified.value)
        this.preRFxForm.controls['rfx_constraints']['controls']['minority_certified']['controls'].text.setValue(this.preRFxEdit.rfx_constraints.minority_certified.text)
        this.preRFxForm.controls['rfx_constraints']['controls']['other_constraints']['controls'].value.setValue(this.preRFxEdit.rfx_constraints.other_constraints.value)
        this.preRFxForm.controls['rfx_constraints']['controls']['other_constraints']['controls'].text.setValue(this.preRFxEdit.rfx_constraints.other_constraints.text)
      
        this.preRFxForm.controls['pre_proposal_conf'].setValue(this.preRFxEdit.pre_proposal_conf)
        this.preRFxForm.controls['pre_proposal_conf_date'].setValue(this.preRFxEdit.pre_proposal_conf_date)

        this.preRFxForm.controls['submission_format'].setValue(this.preRFxEdit.submission_format)
        this.preRFxForm.controls['source'].setValue(this.preRFxEdit.source)
        this.preRFxForm.controls['source_url'].setValue(this.preRFxEdit.source_url)
        this.preRFxForm.controls['rfx_third_party_src_url'].setValue(this.preRFxEdit.rfx_third_party_src_url)

        this.preRFxForm.controls['buyer']['controls'].name.setValue(this.preRFxEdit.buyer ? this.preRFxEdit.buyer.name : '')
        this.preRFxForm.controls['buyer']['controls'].title.setValue(this.preRFxEdit.buyer ? this.preRFxEdit.buyer.title : '')
        this.preRFxForm.controls['buyer']['controls'].contact.setValue(this.preRFxEdit.buyer ? this.preRFxEdit.buyer.contact : '')
        this.preRFxForm.controls['buyer']['controls'].email.setValue(this.preRFxEdit.buyer ? this.preRFxEdit.buyer.email : '')

        if( this.preRFxEdit.attachment ) {
          this.selectedAttachmentFile = new File([], this.preRFxEdit.attachment.name)
        }

        this.editDisabled = this.preRFxEdit.status !== 'draft' && this.preRFxEdit.status !== 'push-back'
        if(this.editDisabled) {
          this.editDisabledMessage = `This Pre-RFx is currently in <strong>${this.getRFxStatusText( this.preRFxEdit.status )}</strong> status, and cannot be modified.`
        }
      }, 250)
    })
  }

  public getRFxStatusText(status: string): string {
    let statusObjs: { value: string, label: string }[] = this.preRFxStatus.filter( preRFxStatus => {
      return preRFxStatus.value === status
    })
    return statusObjs.length > 0 ? statusObjs[0].label : ''
  }

  public preRFxFormSubmit(saveAsDraft?: boolean): void {
    this.formStatusMessage = ''
    this.formSuccessMessage = ''

    if(this.preRFxForm.valid || saveAsDraft){
      if(saveAsDraft) {
        this.savingDraft = true
      } else {
        this.savingForm = true
      }
      
      if(this.preRFxEdit && this.preRFxEdit.id) {
        let data: PreRFx = this.preRFxForm.value
        data.id = this.preRFxEdit.id
        data.created_by_user_id = this.preRFxEdit.created_by_user_id ? this.preRFxEdit.created_by_user_id : this.currentUser.id
        data.created_on_date = this.preRFxEdit.created_on_date ? this.preRFxEdit.created_on_date : formatDate(new Date(), 'yyyy-MM-dd', 'en')
        data.status = saveAsDraft ? 'draft' : 'pending'
        data.rfx_status_comments = this.preRFxEdit.rfx_status_comments && this.preRFxEdit.rfx_status_comments.length > 0 ? this.preRFxEdit.rfx_status_comments : []

        if( this.selectedAttachmentFile && this.selectedAttachmentFile.size > 0 ) { // Attachment updated
          this._pre_rfx.deleteRFxAttachment(this.preRFxEdit.attachment ? this.preRFxEdit.attachment.name : '')
            .then( res => {
              this.fileUpload = new Upload(this.selectedAttachmentFile)
              this._pre_rfx.pushRFxAttachmentUpload(this.fileUpload)
                .then( upload => {
                  data.attachment = {
                    download_url: upload.url,
                    name: upload.name
                  }
                  this.saveEditPreRFxData(data)
                })
                .catch( error => {
                  this.savingForm = false
                  this.savingDraft = false
                  console.error('Error while uploading Pre-RFx Attachment', error)
                })
            })
            .catch( error => {
              this.savingForm = false
              this.savingDraft = false
              console.error('Error while deleting Pre-RFx Attachment', error)
            })
        } else { // Attachment remains the same
          if(this.preRFxEdit.attachment) {
            data.attachment = this.preRFxEdit.attachment
          }
          this.saveEditPreRFxData(data)
        }
      } else {
        let data: PreRFx = this.preRFxForm.value
        data.created_by_user_id = this.currentUser.id
        data.created_on_date = formatDate(new Date(), 'yyyy-MM-dd', 'en')
        data.status = saveAsDraft ? 'draft' : 'pending'
        
        if(this.selectedAttachmentFile && this.selectedAttachmentFile.name) {
          this.fileUpload = new Upload(this.selectedAttachmentFile)
          this._pre_rfx.pushRFxAttachmentUpload(this.fileUpload)
            .then( upload => {
              data.attachment = {
                download_url: upload.url,
                name: upload.name
              }
              this.saveNewPreRFxData(data)
            })
            .catch( error => {
              this.savingForm = false
              this.savingDraft = false
              console.error('Error while uploading Pre-RFx Attachment', error)
            })
        } else {
          this.saveNewPreRFxData(data)
        }
        
      }
    } else {
      let invalidFields: string[] = this.getInvalidFields()
      this.formStatusMessage = `Make sure you have provided data for all the required fields. ${ invalidFields.join(', ') } ${ invalidFields.length > 1 ? 'are' : 'is' } missing data.`
      window.scrollTo(0, 0)
    }
  }

  private saveNewPreRFxData(data: PreRFx): void {
    data.title_search_array = data.title.toLowerCase().split(' ')
    this._pre_rfx.createPreRFx(data)
      .then( res => {
        if(res.id) {
          this._pre_rfx.attachIdToPreRFx(res.id)
            .then( response => {
              if(data.status === 'pending') {
                let clientAgencyName: string = this.getClientAgencyText( data.client_agency_id )
                let emailData: any = {
                  "searcher_name": this.currentUser.name,
                  "pre_rfx_id": res.id,
                  "rfx_number": data.rfx_number,
                  "rfx_title": data.title,
                  "client_agency": clientAgencyName,
                  "state_province": data.state_province,
                  "pre_rfx_notes": data.rfx_comments
                }
                this._utils.sendEmail(this.approverEmails, EmailTypes.PreRFxCreated, emailData)
                  .then( (emailResponse) => {
                    let notificaitonText: string = this.preRfxCreateNotificationMsg(data.title, clientAgencyName, res.id)
                    this._utils.sendSkypeNotification(notificaitonText, this.getBusinessUnitText(data.bu_id))
                      .then( (notificationResponse) => {
                        this.preRFxForm.reset()
                        this.resetCustomControls()
                        this.formSuccessMessage = "Your new Pre-RFx has been added."
                        this.savingForm = false
                        window.scrollTo(0, 0)
                      })
                      .catch( (error) => {
                        console.error('Error while sending Skype Notificaiton: ', error)
                      })
                  })
                  .catch( (error) => {
                    console.error('Error while sending email notifications to approvers: ', error)
                  })
              } else {
                this.preRFxForm.reset()
                this.resetCustomControls()
                this.formSuccessMessage = "Your Pre-RFx draft has been saved."
                this.savingDraft = false
                window.scrollTo(0, 0)
              }
            })
            .catch( error => {
              this.savingForm = false
              this.savingDraft = false
              console.error('Error while attaching Pre-RFx id: ', error)
            })
        }
      })
      .catch( error => {
        this.savingForm = false
        this.savingDraft = false
        console.error('Error while creating Pre-RFx: ', error)
      })
  }

  private saveEditPreRFxData(data: PreRFx): void {
    if(data.status === 'pending') {
      if(data.rfx_status_comments.length > 0) { // Re-submitting for review
        this.preRFxPendingStatusData = data
      } else { // Submitting for review for the first time
        data.title_search_array = data.title.toLowerCase().split(' ')
        this._pre_rfx.updatePreRFx(data)
          .then( res => {
            let clientAgencyName: string = this.getClientAgencyText( data.client_agency_id )
            let emailData: any = {
              "searcher_name": this.currentUser.name,
              "pre_rfx_id": data.id,
              "rfx_number": data.rfx_number,
              "rfx_title": data.title,
              "client_agency": clientAgencyName,
              "state_province": data.state_province,
              "pre_rfx_notes": data.rfx_comments
            }
            this._utils.sendEmail(this.approverEmails, EmailTypes.PreRFxCreated, emailData)
              .then( (emailResponse) => {
                let notificaitonText: string = this.preRfxCreateNotificationMsg(data.title, clientAgencyName, data.id)
                this._utils.sendSkypeNotification(notificaitonText, this.getBusinessUnitText(data.bu_id))
                  .then( (notificationResponse) => {
                    this.formSuccessMessage = "Your Pre-RFx has been updated."
                    this.savingForm = false
                    window.scrollTo(0, 0)
                  })
                  .catch( (error) => {
                    console.error('Error while sending Skype Notificaiton: ', error)
                  })
              })
              .catch( (error) => {
                console.error('Error while sending email notifications to approvers: ', error)
              })
          })
          .catch( error => {
            console.error('Error while updating Pre-RFx: ', error)
          })
      }
    } else {
      data.title_search_array = data.title.toLowerCase().split(' ')
      this._pre_rfx.updatePreRFx(data)
        .then( res => {
          this.formSuccessMessage = "Your Pre-RFx has been updated."
          this.savingForm = false
          this.savingDraft = false
          window.scrollTo(0, 0)
        })
        .catch( error => {
          console.error('Error while updating Pre-RFx: ', error)
        })
    }
  }

  public preRFxAddCommentModalClosed(event): void {
    this.preRFxPendingStatusData = null
    if(event.proceed) {
      let commentText: string = event.comment_text ? event.comment_text : ''
      let commentObj: RFxComment = {
        date_time: formatDate(new Date(), 'MMM d, y h:mm a', 'en'),
        sender_id: this.currentUser.id,
        sender_name: this.currentUser.name,
        comment_text: commentText,
        status: event.pre_rfx_data.status
      }
      event.pre_rfx_data.rfx_status_comments.push(commentObj)
      
      event.pre_rfx_data.title_search_array = event.pre_rfx_data.title.toLowerCase().split(' ')
      this._pre_rfx.updatePreRFx(event.pre_rfx_data)
        .then( res => {
          let clientAgencyName: string = this.getClientAgencyText( event.pre_rfx_data.client_agency_id )
          let emailData: any = {
            "searcher_name": this.currentUser.name,
            "pre_rfx_id": event.pre_rfx_data.id,
            "rfx_number": event.pre_rfx_data.rfx_number,
            "rfx_title": event.pre_rfx_data.title,
            "client_agency": clientAgencyName,
            "state_province": event.pre_rfx_data.state_province,
            "searcher_comments": event.comment_text
          }
          this._utils.sendEmail(this.approverEmails, EmailTypes.PreRFxUpdatedBySearcher, emailData)
            .then( (emailResponse) => {
              let notificaitonText: string = this.preRfxUpdateNotificationMsg(event.pre_rfx_data.title, clientAgencyName, event.pre_rfx_data.id)
              this._utils.sendSkypeNotification(notificaitonText, this.getBusinessUnitText(event.pre_rfx_data.bu_id))
                .then( (notificationResponse) => {
                  this.formSuccessMessage = "Your Pre-RFx has been updated."
                  this.savingForm = false
                  window.scrollTo(0, 0)
                })
                .catch( (error) => {
                  console.error('Error while sending Skype Notificaiton: ', error)
                })
            })
            .catch( (error) => {
              console.error('Error while sending email notifications to approvers: ', error)
            })
        })
        .catch( error => {
          console.error('Error while updating Pre-RFx: ', error)
        })
    } else {
      this.savingForm = false
    }
  }

  private resetCustomControls(): void {
    this.preRFxForm.controls['rfx_constraints']['controls']['local_vendors']['controls']['value'].setValue(false)
    this.preRFxForm.controls['rfx_constraints']['controls']['certification_license']['controls']['value'].setValue(false)
    this.preRFxForm.controls['rfx_constraints']['controls']['financial_conditions']['controls']['value'].setValue(false)
    this.preRFxForm.controls['rfx_constraints']['controls']['minority_certified']['controls']['value'].setValue(false)
    this.preRFxForm.controls['rfx_constraints']['controls']['other_constraints']['controls']['value'].setValue(false)
    this.preRFxForm.controls['pre_proposal_conf'].setValue(false)
    this.selectedAttachmentFile = null
  }

  public rfxAttachmentUpdated(event: any): void {
    this.selectedAttachmentFile = event.target.files[0]
  }

  public getEditDisabledMessageClass(): string {
    let className = 'alert-warning'
    if(this.preRFxEdit){
      switch(this.preRFxEdit.status){
        case 'go':
          className = 'alert-success'
          break
        case 'no-go':
          className = 'alert-danger'
          break
        default:
          className = 'alert-warning'
          break
      }
    }
    className += this.editDisabledMessage ? ' show' : ' hide'
    return className
  }

  public getClientAgencyText(ca_id: string): string {
    let caObjs: ClientAgency[] = this.clientAgencies.filter( clientAgency => {
      return clientAgency.id === ca_id
    })
    return caObjs.length > 0 ? caObjs[0].name + ' (' + caObjs[0].type + ')' : ''
  }

  public getBusinessUnitText(bu_id: string): string {
    let buObjs: BusinessUnit[] = this.businessUnits.filter( businessUnit => {
      return businessUnit.id === bu_id
    })
    return buObjs.length > 0 ? buObjs[0].name : ''
  }

  private preRfxCreateNotificationMsg(title: string, clientAgency: string, preRFxId: string):string {
    return `There’s a new RFX, titled *${title}* from _${clientAgency}_, posted. For more details visit: https://rfx-tracker.web.app/pre-rfx-view/${preRFxId} `
  }

  private preRfxUpdateNotificationMsg(title: string, clientAgency: string, preRFxId: string):string {
    return `The RFX, titled *${title}* from _${clientAgency}_, has been updated and is available for another review. For more details visit: https://rfx-tracker.web.app/pre-rfx-view/${preRFxId} `
  }

  getInvalidFields(): string[] {
    let invalidFields: string[] = []
    for(let control in this.preRFxForm.controls) {
      if( !this.preRFxForm.controls[control].valid ) {
        invalidFields.push( this.reqFieldsMap[control] )
      }
    }
    return invalidFields
  }
}
