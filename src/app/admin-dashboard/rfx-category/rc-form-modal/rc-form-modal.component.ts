import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, RfxCategory } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-rc-form-modal',
  templateUrl: './rc-form-modal.component.html',
  styleUrls: ['./rc-form-modal.component.sass']
})
export class RcFormModalComponent implements OnInit, AfterViewInit {

  public rcForm = this._fb.group({
    code: ['', [ Validators.required ]],
    display_text: ['', [ Validators.required ]],
    help_text: ['']
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''

  @Input()
  public selectedRCData: RfxCategory
  
  @Output() 
  rcFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showRCForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedRCData && this.selectedRCData.id) {
      setTimeout(()=> {
        this.rcForm.controls['code'].setValue(this.selectedRCData.code)
        this.rcForm.controls['display_text'].setValue(this.selectedRCData.display_text)
        this.rcForm.controls['help_text'].setValue(this.selectedRCData.help_text)
      }, 250)
    }
  }

  public rcFormSubmit(): void {
    if(this.rcForm.valid){
      this.formStatusMessage = ''
      if(this.selectedRCData && this.selectedRCData.id) {
        let data = this.rcForm.value
        data.id = this.selectedRCData.id
        this._admin.updateRfxCategory(data)
          .then( res => {
            this.formSuccessMessage = "RFx Category has been updated."
          })
          .catch( error => {
            console.error('Error while updating RFx Category: ', error)
          })
      } else {
        this._admin.createRfxCategory(this.rcForm.value)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToRfxCategory(res.id)
                .then( result => {
                  this.formSuccessMessage = "Your new RFx Category has been added."
                  this.rcForm.reset()
                })
                .catch( error => {
                  console.error('Error while attaching RFx Category id: ', error)
                })
            }
          })
          .catch( error => {
            console.error('Error while adding new RFx Category: ', error)
          })
      }
    } else {
      if (this.rcForm.controls.code.errors) {
        this.formStatusMessage = 'RFx Category Code is a required field.'
      } else if (this.rcForm.controls.display_text.errors) {
        this.formStatusMessage = 'RFx Category Display Text is a required field.'
      }
    }
  }

  public showRCForm() {
    this.rcForm.reset()
    this.formStatusMessage = ''
    this.formSuccessMessage = ''
    $('#rcForm').modal('show')
  }

  public closeRCForm() {
    $('#rcForm').modal('hide')
    this.rcFormClosed.emit()
  }

}
