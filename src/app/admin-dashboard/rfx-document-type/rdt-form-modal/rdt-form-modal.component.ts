import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, RfxDocumentType } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-rdt-form-modal',
  templateUrl: './rdt-form-modal.component.html',
  styleUrls: ['./rdt-form-modal.component.sass']
})
export class RdtFormModalComponent implements OnInit, AfterViewInit {

  public rdtForm = this._fb.group({
    type: ['', [ Validators.required ]],
    description: [''],
    help_text: ['']
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''

  @Input()
  public selectedRDTData: RfxDocumentType
  
  @Output() 
  rdtFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showRDTForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedRDTData && this.selectedRDTData.id) {
      setTimeout(()=> {
        this.rdtForm.controls['type'].setValue(this.selectedRDTData.type)
        this.rdtForm.controls['description'].setValue(this.selectedRDTData.description)
        this.rdtForm.controls['help_text'].setValue(this.selectedRDTData.help_text)
      }, 250)
    }
  }

  public rdtFormSubmit(): void {
    if(this.rdtForm.valid){
      this.formStatusMessage = ''
      if(this.selectedRDTData && this.selectedRDTData.id) {
        let data = this.rdtForm.value
        data.id = this.selectedRDTData.id
        this._admin.updateRfxDocumentType(data)
          .then( res => {
            this.formSuccessMessage = "RFx Document Type has been updated."
          })
          .catch( error => {
            console.error('Error while updating RFx Document Type: ', error)
          })
      } else {
        this._admin.createRfxDocumentType(this.rdtForm.value)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToRfxDocumentType(res.id)
                .then( result => {
                  this.formSuccessMessage = "Your new RFx Document Type has been added."
                  this.rdtForm.reset()
                })
                .catch( error => {
                  console.error('Error while attaching RFx Document Type id: ', error)
                })
            }
          })
          .catch( error => {
            console.error('Error while adding new RFx Document Type: ', error)
          })
      }
    } else {
      if (this.rdtForm.controls.type.errors) {
        this.formStatusMessage = 'RFx Document Type is a required field.'
      }
    }
  }

  public showRDTForm() {
    this.rdtForm.reset()
    this.formStatusMessage = ''
    this.formSuccessMessage = ''
    $('#rdtForm').modal('show')
  }

  public closeRDTForm() {
    $('#rdtForm').modal('hide')
    this.rdtFormClosed.emit()
  }

}
