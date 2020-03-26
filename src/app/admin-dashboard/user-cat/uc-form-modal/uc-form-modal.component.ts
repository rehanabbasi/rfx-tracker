import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, User, RfxCategory, UserCategory } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-uc-form-modal',
  templateUrl: './uc-form-modal.component.html',
  styleUrls: ['./uc-form-modal.component.sass']
})
export class UcFormModalComponent implements OnInit, AfterViewInit {

  public ucForm = this._fb.group({
    user_id: ['', [ Validators.required ]],
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''


  @Input()
  public users: User[]
  
  @Input()
  public rfxCategories: RfxCategory[]
  
  @Input()
  public selectedUCData: UserCategory
  
  @Output() 
  ucFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.ucForm.addControl('cat_ids', this._fb.array(this.rfxCategories.map(x => !1)))
    this.showUCForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedUCData && this.selectedUCData.id) {
      setTimeout(() => {
        this.ucForm.controls['user_id'].setValue(this.selectedUCData.user_id)
        this.ucForm.setControl('cat_ids', this._fb.array(this.rfxCategories.map(x => this.selectedUCData.cat_ids.indexOf(x.id) > -1)))
      }, 250)
    } else {
      setTimeout(() => {
        this.ucForm.controls['user_id'].setValue(this.users[0].id)
      }, 250)
    }
  }

  private convertCheckBoxesValueToCatids(key: string): string {
    return this.ucForm.value[key].map((x, i) => x && this.rfxCategories[i].id).filter(x => !!x)
  }

  public ucFormSubmit(): void {
    if(this.ucForm.valid){
      this.formStatusMessage = ''
      this.formSuccessMessage = ''
      if(this.selectedUCData && this.selectedUCData.id) {
        let data = this.ucForm.value
        data.id = this.selectedUCData.id
        data.cat_ids = this.convertCheckBoxesValueToCatids('cat_ids')
        this._admin.updateUserCategory(data)
          .then( res => {
            this.formSuccessMessage = "User - RFx Category has been updated."
          })
          .catch( error => {
            console.error('Error while updating User - RFx Category: ', error)
          })
      } else {
        let data = this.ucForm.value
        data.cat_ids = this.convertCheckBoxesValueToCatids('cat_ids')
        this._admin.createUserCategory(data)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToUserCategory(res.id)
                .then( result => {
                  this.formSuccessMessage = "Your new User - RFx Category has been added."
                  this.ucForm.reset()
                  this.ucForm.controls['user_id'].setValue(this.users[0].id)
                })
                .catch( error => {
                  console.error('Error while attaching User - RFx Category id: ', error)
                })
            }
          })
          .catch( error => {
            console.error('Error while adding new User - RFx Category: ', error)
          })
      }
    } else {
      if (this.ucForm.controls.user_id.errors) {
        this.formStatusMessage = 'User is a required field.'
      } else if (this.ucForm.controls.cat_ids.errors) {
        this.formStatusMessage = 'RFx Categories is a required field.'
      }
    }
  }

  public showUCForm() {
    this.ucForm.reset()
    this.formStatusMessage = ''
    this.formSuccessMessage = ''
    $('#ucForm').modal('show')
  }

  public closeUCForm() {
    $('#ucForm').modal('hide')
    this.ucFormClosed.emit()
  }

}