import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, RfxType } from '../../../shared/services/admin.service';

declare var $: any;


@Component({
  selector: 'app-rt-form-modal',
  templateUrl: './rt-form-modal.component.html',
  styleUrls: ['./rt-form-modal.component.sass']
})
export class RtFormModalComponent implements OnInit, AfterViewInit {

  public rtForm = this._fb.group({
    code: ['', [ Validators.required ]],
    display_text: ['', [ Validators.required ]],
    help_text: ['']
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''

  @Input()
  public selectedRTData: RfxType
  
  @Output() 
  rtFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showRTForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedRTData && this.selectedRTData.id) {
      setTimeout(()=> {
        this.rtForm.controls['code'].setValue(this.selectedRTData.code)
        this.rtForm.controls['display_text'].setValue(this.selectedRTData.display_text)
        this.rtForm.controls['help_text'].setValue(this.selectedRTData.help_text)
      }, 250)
    }
  }

  public rtFormSubmit(): void {
    if(this.rtForm.valid){
      this.formStatusMessage = ''
      if(this.selectedRTData && this.selectedRTData.id) {
        let data = this.rtForm.value
        data.id = this.selectedRTData.id
        this._admin.updateRfxType(data)
          .then( res => {
            this.formSuccessMessage = "RFx Type has been updated."
          })
          .catch( error => {
            console.error('Error while updating RFx Type: ', error)
          })
      } else {
        this._admin.createRfxType(this.rtForm.value)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToRfxType(res.id)
                .then( result => {
                  this.formSuccessMessage = "Your new RFx Type has been added."
                  this.rtForm.reset()
                })
                .catch( error => {
                  console.error('Error while attaching RFx Type id: ', error)
                })
            }
          })
          .catch( error => {
            console.error('Error while adding new RFx Type: ', error)
          })
      }
    } else {
      if (this.rtForm.controls.code.errors) {
        this.formStatusMessage = 'RFx Type Code is a required field.'
      } else if (this.rtForm.controls.display_text.errors) {
        this.formStatusMessage = 'RFx Type Display Text is a required field.'
      }
    }
  }

  public showRTForm() {
    this.rtForm.reset()
    this.formStatusMessage = ''
    this.formSuccessMessage = ''
    $('#rtForm').modal('show')
  }

  public closeRTForm() {
    $('#rtForm').modal('hide')
    this.rtFormClosed.emit()
  }

}
