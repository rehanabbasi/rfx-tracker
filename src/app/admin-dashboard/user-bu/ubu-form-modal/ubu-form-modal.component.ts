import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, User, BusinessUnit, UserBusinessUnit } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-ubu-form-modal',
  templateUrl: './ubu-form-modal.component.html',
  styleUrls: ['./ubu-form-modal.component.sass']
})
export class UbuFormModalComponent implements OnInit, AfterViewInit {

  public ubuForm = this._fb.group({
    user_id: ['', [ Validators.required ]],
    // bu_ids: this._fb.array(this.businessUnits.map(x => !1))
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''


  @Input()
  public users: User[]
  
  @Input()
  public businessUnits: BusinessUnit[]
  
  @Input()
  public selectedUBUData: UserBusinessUnit
  
  @Output() 
  ubuFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.ubuForm.addControl('bu_ids', this._fb.array(this.businessUnits.map(x => !1)))
    this.showUBUForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedUBUData && this.selectedUBUData.id) {
      setTimeout(() => {
        this.ubuForm.controls['user_id'].setValue(this.selectedUBUData.user_id)
        this.ubuForm.setControl('bu_ids', this._fb.array(this.businessUnits.map(x => this.selectedUBUData.bu_ids.indexOf(x.id) > -1)))
      }, 250)
    } else {
      setTimeout(() => {
        this.ubuForm.controls['user_id'].setValue(this.users[0].id)
      }, 250)
    }
  }

  private convertCheckBoxesValueToBUid(key: string): string {
    return this.ubuForm.value[key].map((x, i) => x && this.businessUnits[i].id).filter(x => !!x)
  }

  public ubuFormSubmit(): void {
    // console.log(this.ubuForm.value)
    // console.log(this.convertCheckBoxesValueToBUid('bu_ids'))
    if(this.ubuForm.valid){
      this.formStatusMessage = ''
      this.formSuccessMessage = ''
      if(this.selectedUBUData && this.selectedUBUData.id) {
        let data = this.ubuForm.value
        data.id = this.selectedUBUData.id
        data.bu_ids = this.convertCheckBoxesValueToBUid('bu_ids')
        this._admin.updateUserBusinessUnit(data)
          .then( res => {
            this.formSuccessMessage = "User - Business Unit has been updated."
          })
          .catch( error => {
            console.error('Error while updating User - Business Unit: ', error)
          })
      } else {
        let data = this.ubuForm.value
        data.bu_ids = this.convertCheckBoxesValueToBUid('bu_ids')
        this._admin.createUserBusinessUnit(data)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToUserBusinessUnit(res.id)
                .then( result => {
                  this.formSuccessMessage = "Your new User - Business Unit has been added."
                  this.ubuForm.reset()
                  this.ubuForm.controls['user_id'].setValue(this.users[0].id)
                })
                .catch( error => {
                  console.error('Error while attaching User - Business Unit id: ', error)
                })
            }
          })
          .catch( error => {
            console.error('Error while adding new User - Business Unit: ', error)
          })
      }
    } else {
      if (this.ubuForm.controls.user_id.errors) {
        this.formStatusMessage = 'User is a required field.'
      } else if (this.ubuForm.controls.bu_ids.errors) {
        this.formStatusMessage = 'Business Units is a required field.'
      }
    }
  }

  public showUBUForm() {
    this.ubuForm.reset()
    this.formStatusMessage = ''
    this.formSuccessMessage = ''
    $('#ubuForm').modal('show')
  }

  public closeUBUForm() {
    $('#ubuForm').modal('hide')
    this.ubuFormClosed.emit()
  }

}
