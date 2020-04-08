import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router'

import { PreRfxService, PreRFx, Upload } from '../shared/services/pre-rfx.service';
import { AdminService, BusinessUnit, RfxType, ClientAgency, RfxCategory } from '../shared/services/admin.service';

@Component({
  selector: 'app-pre-rfx-add',
  templateUrl: './pre-rfx-add.component.html',
  styleUrls: ['./pre-rfx-add.component.sass']
})
export class PreRfxAddComponent implements OnInit, AfterViewInit {
  public secHeaderIcon = faChevronRight
  
  public preRFxForm = this._fb.group({
    bu_id: ['', [ Validators.required ]],
    rfx_number: ['', [ Validators.required ]],
    title: ['', [ Validators.required ]],
    status: ['', [ Validators.required ]],
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
    { value: 'push-back', label: 'Push Back' },
    { value: 'no-go', label: 'No Go' },
    { value: 'go', label: 'Go' }
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

  // For section expand/collapse
  public showBasicInfoSec: boolean = true
  public showDetailedInfoSec: boolean = true
  public showBuyerInfoSec: boolean = true

  public preRFxId: string
  private preRFxEdit: PreRFx
  
  constructor(
    private _pre_rfx: PreRfxService,
    private _admin: AdminService,
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
      })
    )
  }

  ngAfterViewInit(): void {
  }

  private loadRFxData(): void {
    this._pre_rfx.getPreRFxById(this.preRFxId).subscribe( preRFx => {
      this.preRFxEdit = preRFx
      setTimeout(()=> {
        this.preRFxForm.controls['bu_id'].setValue(this.preRFxEdit.bu_id)
        this.preRFxForm.controls['rfx_number'].setValue(this.preRFxEdit.rfx_number)
        this.preRFxForm.controls['title'].setValue(this.preRFxEdit.title)
        this.preRFxForm.controls['status'].setValue(this.preRFxEdit.status)

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

        this.selectedAttachmentFile = new File([], this.preRFxEdit.attachment.name)
      }, 250)
    })
  }

  public preRFxFormSubmit(): void {
    this.formStatusMessage = ''
    this.formSuccessMessage = ''

    if(this.preRFxForm.valid){
      this.savingForm = true
      
      if(this.preRFxEdit && this.preRFxEdit.id) {
        let data = this.preRFxForm.value
        data.id = this.preRFxEdit.id
        if( this.selectedAttachmentFile.size > 0 ) { // Attachment updated
          this._pre_rfx.deleteRFxAttachment(this.preRFxEdit.attachment ? this.preRFxEdit.attachment.name : '')
            .then( res => {
              console.log('delete attachment res: ', res)
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
                  console.error('Error while uploading Pre-RFx Attachment', error)
                })
            })
            .catch( error => {
              this.savingForm = false
              console.error('Error while deleting Pre-RFx Attachment', error)
            })
        } else { // Attachment remains the same
          this.saveEditPreRFxData(data)
        }
      } else {
        let data: PreRFx = this.preRFxForm.value
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
              console.error('Error while uploading Pre-RFx Attachment', error)
            })
        } else {
          this.saveNewPreRFxData(data)
        }
        
      }
    } else {
      this.formStatusMessage = 'Make sure you have provided data for all the required fields.'
      window.scrollTo(0, 0)
    }
  }

  private saveNewPreRFxData(data: PreRFx): void {
    this._pre_rfx.createPreRFx(data)
      .then( res => {
        if(res.id) {
          this._pre_rfx.attachIdToPreRFx(res.id)
            .then( res => {
              this.preRFxForm.reset()
              this.resetCustomControls()
              this.formSuccessMessage = "Your new Pre-RFx has been added."
              this.savingForm = false
              window.scrollTo(0, 0)
            })
            .catch( error => {
              this.savingForm = false
              console.error('Error while attaching Pre-RFx id: ', error)
            })
        }
      })
      .catch( error => {
        this.savingForm = false
        console.error('Error while creating Pre-RFx: ', error)
      })
  }

  private saveEditPreRFxData(data: PreRFx): void {
    this._pre_rfx.updatePreRFx(data)
      .then( res => {
        this.formSuccessMessage = "Your Pre-RFx has been updated."
        this.savingForm = false
        window.scrollTo(0, 0)
      })
      .catch( error => {
        console.error('Error while updating Pre-RFx: ', error)
      })
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

}
