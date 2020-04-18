import { Component, OnInit, AfterViewInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AdminService, User, UserRole } from '../../../shared/services/admin.service';
import { UtilsService, EmailTypes } from '../../../shared/services/utils.service';
import { AuthService } from '../../../shared/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-usr-form-modal',
  templateUrl: './usr-form-modal.component.html',
  styleUrls: ['./usr-form-modal.component.sass']
})
export class UsrFormModalComponent implements OnInit, AfterViewInit, OnDestroy {

  public usrForm = this._fb.group({
    name: [''],
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

  private currentUser: User
  private subscriptions: Subscription[] = []
  public savingUser: boolean = false

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService,
    private _utils: UtilsService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.showUSRForm()

    this.subscriptions.push(
      this._auth.currentUser$.subscribe( (currentUserArray) => {
        if(currentUserArray[0]) {
          this.currentUser = currentUserArray[0]
        }
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
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
        this.usrForm.controls['role_id'].setValue('')
      }, 250)
    }
  }

  public usrFormSubmit(): void {
    if(this.usrForm.valid){
      this.savingUser = true
      this.formStatusMessage = ''
      this.formSuccessMessage = ''
      if(this.selectedUSRData && this.selectedUSRData.id) {
        let data = this.usrForm.value
        data.id = this.selectedUSRData.id
        this._admin.updateUser(data)
          .then( res => {
            this.formSuccessMessage = "User has been updated."
            this.savingUser = false
          })
          .catch( error => {
            console.error('Error while updating User: ', error)
            this.savingUser = false
          })
      } else {
        this._admin.createUser(this.usrForm.value)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToUser(res.id)
                .then( result => {
                  let emailData = {
                    "admin_name": this.currentUser.name,
                    "user_role": this.getRoleText( this.usrForm.value.role_id ),
                    "user_id": res.id
                  }
                  this._utils.sendEmail(this.usrForm.value.email, EmailTypes.UserInvite, emailData)
                    .then( emailResponse => {
                      this.formSuccessMessage = "New user added. An email invite has been sent to the user to complete the registration process."
                      this.usrForm.reset()
                      this.usrForm.controls['role_id'].setValue('')
                      this.savingUser = false
                    })
                    .catch( error => {
                      console.log('Error while sending registration invite to the user: ', error)
                      this.savingUser = false
                    })
                  
                })
                .catch( error => {
                  console.error('Error while attaching User id: ', error)
                  this.savingUser = false
                })
            }
          })
          .catch( error => {
            console.error('Error while adding new User: ', error)
            this.savingUser = false
          })
      }
    } else {
      if (this.usrForm.controls.email.errors) {
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

  public getRoleText(role_id: string): string {
    let roleObj: UserRole[] = this.userRoles.filter( role => {
      return role.id === role_id
    })
    return roleObj.length > 0 ? roleObj[0].name : ''
  }

}