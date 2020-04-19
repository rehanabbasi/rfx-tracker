import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, ViewRole, UserRole } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-vr-form-modal',
  templateUrl: './vr-form-modal.component.html',
  styleUrls: ['./vr-form-modal.component.sass']
})
export class VrFormModalComponent implements OnInit, AfterViewInit {

  public vrForm = this._fb.group({
    role_id: ['', [ Validators.required ]]
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''

  public rolesAccessArray: {
    label: string,
    name: string
  }[] =[
    { label: 'Pre-RFx Read', name: 'pre_rfx_read'},
    { label: 'Pre-RFx Write', name: 'pre_rfx_write'},
    { label: 'RFx Read', name: 'rfx_read'},
    { label: 'RFx Write', name: 'rfx_write'},
    { label: 'Proposals Read', name: 'proposal_read'},
    { label: 'Proposals Write', name: 'proposal_write'},
    { label: 'Contracts Read', name: 'contract_read'},
    { label: 'Contracts Write', name: 'contract_write'},
    { label: 'Task Orders Read', name: 'task_order_read'},
    { label: 'Task Orders Write', name: 'task_order_write'},
    { label: 'All', name: 'all'}
  ] 

  @Input()
  public selectedRoleData: UserRole

  @Input()
  public userRoles: UserRole[]
  
  @Output() 
  vrFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.vrForm.addControl('view_access', this._fb.array(this.rolesAccessArray.map(x => !1)))
    this.showVRForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedRoleData && this.selectedRoleData.id) {
      setTimeout(() => {
        this.vrForm.controls['role_id'].setValue(this.selectedRoleData.id)        
        this.vrForm.setControl('view_access', this._fb.array(this.rolesAccessArray.map(x => this.selectedRoleData.view_access.indexOf(x.name) > -1)))
      }, 250)
    } else {
      setTimeout(() => {
        this.vrForm.controls['role_id'].setValue('')
      }, 250)
    }
  }

  private convertCheckBoxesValueToViewAcess(key: string): string {
    return this.vrForm.value[key].map((x, i) => x && this.rolesAccessArray[i].name).filter(x => !!x)
  }

  public vrFormSubmit(): void {
    if(this.vrForm.valid){
      this.formStatusMessage = ''
      this.formSuccessMessage = ''
      if(this.selectedRoleData && this.selectedRoleData.id) {
        let data = this.vrForm.value
        data.view_access = this.convertCheckBoxesValueToViewAcess('view_access')
        this._admin.updateViewRole(data)
          .then( res => {
            this.formSuccessMessage = "View Access by Role has been updated."
          })
          .catch( error => {
            console.error('Error while updating View Access by Role: ', error)
          })
      } else {
        let data = this.vrForm.value
        data.view_access = this.convertCheckBoxesValueToViewAcess('view_access')
        this._admin.updateViewRole(data)
          .then( res => {
            this.formSuccessMessage = "Your new View Access by Role has been added."
            this.vrForm.reset()
            this.vrForm.controls['role_id'].setValue('')
          })
          .catch( error => {
            console.error('Error while adding new View Access by Role: ', error)
          })
      }
    } else {
      if (this.vrForm.controls.role_id.errors) {
        this.formStatusMessage = 'Role is a required field.'
      }
    }
  }

  public showVRForm() {
    this.vrForm.reset()
    this.formStatusMessage = ''
    this.formSuccessMessage = ''
    $('#vrForm').modal('show')
  }

  public closeVRForm() {
    $('#vrForm').modal('hide')
    this.vrFormClosed.emit()
  }

}