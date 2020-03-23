import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, UserRole } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-ur-form-modal',
  templateUrl: './ur-form-modal.component.html',
  styleUrls: ['./ur-form-modal.component.sass']
})
export class UrFormModalComponent implements OnInit, AfterViewInit {

  public urForm = this._fb.group({
    name: ['', [ Validators.required ]],
    text: ['', [ Validators.required ]],
    help_text: [''],
    active: [true]
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''

  @Input()
  public selectedURData: UserRole
  
  @Output() 
  urFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showURForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedURData && this.selectedURData.id) {
      setTimeout(()=> {
        this.urForm.controls['name'].setValue(this.selectedURData.name)
        this.urForm.controls['text'].setValue(this.selectedURData.text)
        this.urForm.controls['help_text'].setValue(this.selectedURData.help_text)
        this.urForm.controls['active'].setValue(this.selectedURData.active)
      }, 250)
    }
  }

  public urFormSubmit(): void {
    if(this.urForm.valid){
      this.formStatusMessage = ''
      this.formSuccessMessage = ''
      if(this.selectedURData && this.selectedURData.id) {
        let data = this.urForm.value
        data.id = this.selectedURData.id
        this._admin.updateUserRole(data)
          .then( res => {
            this.formSuccessMessage = "User Role has been updated."
          })
          .catch( error => {
            console.error('Error while updating User Role: ', error)
          })
      } else {
        this._admin.createUserRole(this.urForm.value)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToUserRole(res.id)
                .then( result => {
                  this.formSuccessMessage = "Your new User Role has been added."
                  this.urForm.reset()
                })
                .catch( error => {
                  console.error('Error while attaching User Role id: ', error)
                })
            }
          })
          .catch( error => {
            console.error('Error while adding new User Role: ', error)
          })
      }
    } else {
      if (this.urForm.controls.name.errors) {
        this.formStatusMessage = 'Role Name is a required field.'
      } else if (this.urForm.controls.text.errors) {
        this.formStatusMessage = 'Role Text is a required field.'
      }
    }
  }

  public showURForm() {
    this.urForm.reset()
    this.formStatusMessage = ''
    this.formSuccessMessage = ''
    $('#urForm').modal('show')
  }

  public closeURForm() {
    $('#urForm').modal('hide')
    this.urFormClosed.emit()
  }

}