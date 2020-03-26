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
    role_id: ['', [ Validators.required ]],
    pre_rfx: [false, [ Validators.required ]],
    rfx: [false, [ Validators.required ]],
    proposer: [false, [ Validators.required ]],
    contracts_manager: [false, [ Validators.required ]],
    task_orders: [false, [ Validators.required ]],
    all: [false, [ Validators.required ]]
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''

  @Input()
  public selectedVRData: ViewRole

  @Input()
  public userRoles: UserRole[]
  
  @Output() 
  vrFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showVRForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedVRData && this.selectedVRData.id) {
      setTimeout(() => {
        this.vrForm.controls['role_id'].setValue(this.selectedVRData.role_id)
        this.vrForm.controls['pre_rfx'].setValue(this.selectedVRData.pre_rfx)
        this.vrForm.controls['rfx'].setValue(this.selectedVRData.rfx)
        this.vrForm.controls['proposer'].setValue(this.selectedVRData.proposer)
        this.vrForm.controls['contracts_manager'].setValue(this.selectedVRData.contracts_manager)
        this.vrForm.controls['task_orders'].setValue(this.selectedVRData.task_orders)
        this.vrForm.controls['all'].setValue(this.selectedVRData.all)
      }, 250)
    } else {
      setTimeout(() => {
        this.vrForm.controls['role_id'].setValue(this.userRoles[0].id)
        this.vrForm.controls['pre_rfx'].setValue(false)
        this.vrForm.controls['rfx'].setValue(false)
        this.vrForm.controls['proposer'].setValue(false)
        this.vrForm.controls['contracts_manager'].setValue(false)
        this.vrForm.controls['task_orders'].setValue(false)
        this.vrForm.controls['all'].setValue(false)
      }, 250)
    }
  }

  public vrFormSubmit(): void {
    if(this.vrForm.valid){
      this.formStatusMessage = ''
      this.formSuccessMessage = ''
      if(this.selectedVRData && this.selectedVRData.id) {
        let data = this.vrForm.value
        data.id = this.selectedVRData.id
        this._admin.updateViewRole(data)
          .then( res => {
            this.formSuccessMessage = "View Access by Role has been updated."
          })
          .catch( error => {
            console.error('Error while updating View Access by Role: ', error)
          })
      } else {
        this._admin.createViewRole(this.vrForm.value)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToViewRole(res.id)
                .then( result => {
                  this.formSuccessMessage = "Your new View Access by Role has been added."
                  this.vrForm.reset()
                  this.vrForm.controls['role_id'].setValue(this.userRoles[0].id)
                  this.vrForm.controls['pre_rfx'].setValue(false)
                  this.vrForm.controls['rfx'].setValue(false)
                  this.vrForm.controls['proposer'].setValue(false)
                  this.vrForm.controls['contracts_manager'].setValue(false)
                  this.vrForm.controls['task_orders'].setValue(false)
                  this.vrForm.controls['all'].setValue(false)
                })
                .catch( error => {
                  console.error('Error while attaching View Access by Role id: ', error)
                })
            }
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