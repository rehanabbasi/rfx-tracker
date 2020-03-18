import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, BusinessUnit } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-bu-form-modal',
  templateUrl: './bu-form-modal.component.html',
  styleUrls: ['./bu-form-modal.component.sass']
})
export class BuFormModalComponent implements OnInit, AfterViewInit {

  public buForm = this._fb.group({
    name: ['', [ Validators.required ]],
    description: [''],
    date: ['', [ Validators.required ]]
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''

  @Input()
  public selectedBUData: BusinessUnit
  
  @Output() 
  buFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showBUForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedBUData && this.selectedBUData.id) {
      setTimeout(()=> {
        this.buForm.controls['name'].setValue(this.selectedBUData.name)
        this.buForm.controls['description'].setValue(this.selectedBUData.description)
        this.buForm.controls['date'].setValue(this.selectedBUData.date)
      }, 250)
    }
  }

  public buFormSubmit(): void {
    if(this.buForm.valid){
      this.formStatusMessage = ''
      if(this.selectedBUData && this.selectedBUData.id) {
        let data = this.buForm.value
        data.id = this.selectedBUData.id
        this._admin.updateBusinessUnit(data)
          .then( res => {
            this.formSuccessMessage = "Business Unit has been updated."
          })
          .catch( error => {
            console.error('Error while updating BU: ', error)
          })
      } else {
        this._admin.createBusinessUnit(this.buForm.value)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToBusinessUnit(res.id)
                .then( result => {
                  this.formSuccessMessage = "Your new Business Unit has been added."
                  this.buForm.reset()
                })
                .catch( error => {
                  console.error('Error while attaching BU id: ', error)
                })
            }
          })
          .catch( error => {
            console.error('Error while adding new BU: ', error)
          })
      }
    } else {
      if (this.buForm.controls.name.errors) {
        this.formStatusMessage = 'Name is a required field.'
      } else if (this.buForm.controls.date.errors) {
        this.formStatusMessage = 'Effective date is a required field.'
      }
    }
  }

  public showBUForm() {
    this.buForm.reset()
    this.formStatusMessage = ''
    this.formSuccessMessage = ''
    $('#buForm').modal('show')
  }

  public closeBUForm() {
    $('#buForm').modal('hide')
    this.buFormClosed.emit()
  }

}
