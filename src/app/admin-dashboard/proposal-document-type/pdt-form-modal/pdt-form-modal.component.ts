import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, ProposalDocumentType } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-pdt-form-modal',
  templateUrl: './pdt-form-modal.component.html',
  styleUrls: ['./pdt-form-modal.component.sass']
})
export class PdtFormModalComponent implements OnInit, AfterViewInit {

  public pdtForm = this._fb.group({
    type: ['', [ Validators.required ]],
    description: [''],
    help_text: ['']
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''

  @Input()
  public selectedPDTData: ProposalDocumentType
  
  @Output() 
  pdtFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showPDTForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedPDTData && this.selectedPDTData.id) {
      setTimeout(()=> {
        this.pdtForm.controls['type'].setValue(this.selectedPDTData.type)
        this.pdtForm.controls['description'].setValue(this.selectedPDTData.description)
        this.pdtForm.controls['help_text'].setValue(this.selectedPDTData.help_text)
      }, 250)
    }
  }

  public pdtFormSubmit(): void {
    if(this.pdtForm.valid){
      this.formStatusMessage = ''
      if(this.selectedPDTData && this.selectedPDTData.id) {
        let data = this.pdtForm.value
        data.id = this.selectedPDTData.id
        this._admin.updateProposalDocumentType(data)
          .then( res => {
            this.formSuccessMessage = "Proposal Document Type has been updated."
          })
          .catch( error => {
            console.error('Error while updating Proposal Document Type: ', error)
          })
      } else {
        this._admin.createProposalDocumentType(this.pdtForm.value)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToProposalDocumentType(res.id)
                .then( result => {
                  this.formSuccessMessage = "Your new Proposal Document Type has been added."
                  this.pdtForm.reset()
                })
                .catch( error => {
                  console.error('Error while attaching Proposal Document Type id: ', error)
                })
            }
          })
          .catch( error => {
            console.error('Error while adding new Proposal Document Type: ', error)
          })
      }
    } else {
      if (this.pdtForm.controls.type.errors) {
        this.formStatusMessage = 'Proposal Document Type is a required field.'
      }
    }
  }

  public showPDTForm() {
    this.pdtForm.reset()
    this.formStatusMessage = ''
    this.formSuccessMessage = ''
    $('#pdtForm').modal('show')
  }

  public closePDTForm() {
    $('#pdtForm').modal('hide')
    this.pdtFormClosed.emit()
  }

}