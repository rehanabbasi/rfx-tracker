import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, User, UserRole } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-usr-form-modal',
  templateUrl: './usr-form-modal.component.html',
  styleUrls: ['./usr-form-modal.component.sass']
})
export class UsrFormModalComponent implements OnInit, AfterViewInit {

  public usrForm = this._fb.group({
    name: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    phone: [''],
    role_id: ['', [ Validators.required ]],
    active: [true]
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''

  @Input()
  public selectedUSRData: User

  @Input()
  public userRoles: UserRole[]
  
  @Output() 
  usrFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showUSRForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedUSRData && this.selectedUSRData.id) {
      setTimeout(() => {
        this.usrForm.controls['name'].setValue(this.selectedUSRData.name)
        this.usrForm.controls['email'].setValue(this.selectedUSRData.email)
        this.usrForm.controls['phone'].setValue(this.selectedUSRData.phone)
        this.usrForm.controls['role_id'].setValue(this.selectedUSRData.role_id)
        this.usrForm.controls['active'].setValue(this.selectedUSRData.active)
      }, 250)
    } else {
      setTimeout(() => {
        this.usrForm.controls['role_id'].setValue(this.userRoles[0].id)
      }, 250)
    }
  }

  public usrFormSubmit(): void {
    if(this.usrForm.valid){
      this.formStatusMessage = ''
      this.formSuccessMessage = ''
      if(this.selectedUSRData && this.selectedUSRData.id) {
        let data = this.usrForm.value
        data.id = this.selectedUSRData.id
        this._admin.updateUser(data)
          .then( res => {
            this.formSuccessMessage = "User has been updated."
          })
          .catch( error => {
            console.error('Error while updating User: ', error)
          })
      } else {
        this._admin.createUser(this.usrForm.value)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToUser(res.id)
                .then( result => {
                  this.formSuccessMessage = "Your new User has been added."
                  this.usrForm.reset()
                  this.usrForm.controls['role_id'].setValue(this.userRoles[0].id)
                })
                .catch( error => {
                  console.error('Error while attaching User id: ', error)
                })
            }
          })
          .catch( error => {
            console.error('Error while adding new User: ', error)
          })
      }
    } else {
      if (this.usrForm.controls.name.errors) {
        this.formStatusMessage = 'User Name is a required field.'
      } else if (this.usrForm.controls.email.errors) {
        this.formStatusMessage = this.usrForm.controls.email.errors.required ? 'User Email is a required field.' : 'Enter a valid User Email'
      } else if (this.usrForm.controls.role_id.errors) {
        this.formStatusMessage = 'User Role is a required field.'
      }
    }
  }

  public showUSRForm() {
    this.usrForm.reset()
    this.formStatusMessage = ''
    this.formSuccessMessage = ''
    $('#usrForm').modal('show')
  }

  public closeUSRForm() {
    $('#usrForm').modal('hide')
    this.usrFormClosed.emit()
  }

}