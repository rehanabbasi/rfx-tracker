import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PreRfxService, PreRFx, Upload } from '../shared/services/pre-rfx.service';
import { AdminService, BusinessUnit, RfxType, ClientAgency, RfxCategory } from '../shared/services/admin.service';

@Component({
  selector: 'app-pre-rfx-add',
  templateUrl: './pre-rfx-add.component.html',
  styleUrls: ['./pre-rfx-add.component.sass']
})
export class PreRfxAddComponent implements OnInit, AfterViewInit {
  
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
  
  constructor(
    private _pre_rfx: PreRfxService,
    private _admin: AdminService,
    private _fb: FormBuilder
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
      })
    )
  }

  ngAfterViewInit(): void {
  }

  public preRFxFormSubmit(): void {
    console.log(this.preRFxForm)
    this.formStatusMessage = ''
    this.formSuccessMessage = ''

    if(this.preRFxForm.valid){
      this.savingForm = true

      
      // if(this.selectedBUData && this.selectedBUData.id) {
      //   let data = this.buForm.value
      //   data.id = this.selectedBUData.id
      //   this._admin.updateBusinessUnit(data)
      //     .then( res => {
      //       this.formSuccessMessage = "Business Unit has been updated."
      //     })
      //     .catch( error => {
      //       console.error('Error while updating BU: ', error)
      //     })
      // } else {
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
        
      // }
    } else {
      this.formStatusMessage = 'Make sure you have provided data for all the required fields.'
      window.scrollTo(0, 0)
    }
  }

  public saveNewPreRFxData(data: PreRFx): void {
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
