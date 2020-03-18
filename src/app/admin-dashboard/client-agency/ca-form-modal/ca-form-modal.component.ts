import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService, ClientAgency } from '../../../shared/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-ca-form-modal',
  templateUrl: './ca-form-modal.component.html',
  styleUrls: ['./ca-form-modal.component.sass']
})
export class CaFormModalComponent implements OnInit, AfterViewInit {

  public caForm = this._fb.group({
    type: ['', [ Validators.required ]],
    name: ['', [ Validators.required ]],
    description: [''],
    state: ['', [ Validators.required ]]
  })

  public formStatusMessage: string = ''
  public formSuccessMessage: string = ''

  @Input()
  public selectedCAData: ClientAgency
  
  @Output() 
  caFormClosed: EventEmitter<any> = new EventEmitter()

  constructor(
    private _fb: FormBuilder,
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.showCAForm()
  }

  ngAfterViewInit(): void {
    if(this.selectedCAData && this.selectedCAData.id) {
      setTimeout(()=> {
        this.caForm.controls['type'].setValue(this.selectedCAData.type)
        this.caForm.controls['name'].setValue(this.selectedCAData.name)
        this.caForm.controls['description'].setValue(this.selectedCAData.description)
        this.caForm.controls['state'].setValue(this.selectedCAData.state)
      }, 250)
    } else {
      setTimeout(()=> {
        this.caForm.controls['type'].setValue('Federal')
      }, 250)
    }
  }

  public caFormSubmit(): void {
    if(this.caForm.valid){
      this.formStatusMessage = ''
      if(this.selectedCAData && this.selectedCAData.id) {
        let data = this.caForm.value
        data.id = this.selectedCAData.id
        this._admin.updateClientAgency(data)
          .then( res => {
            this.formSuccessMessage = "Client Agency has been updated."
          })
          .catch( error => {
            console.error('Error while updating CA: ', error)
          })
      } else {
        this._admin.createClientAgency(this.caForm.value)
          .then( res => {
            if(res.id) {
              this._admin.attachIdToClientAgency(res.id)
                .then( result => {
                  this.formSuccessMessage = "Your new Client Agency has been added."
                  this.caForm.reset()
                  setTimeout(()=> {
                    this.caForm.controls['type'].setValue('Federal')
                  })
                })
                .catch( error => {
                  console.error('Error while attaching CA id: ', error)
                })
            }
          })
          .catch( error => {
            console.error('Error while adding new CA: ', error)
          })
      }
    } else {
      if (this.caForm.controls.type.errors){
        this.formStatusMessage = 'Type is a required field.'
      } else if (this.caForm.controls.name.errors) {
        this.formStatusMessage = 'Name is a required field.'
      } else if (this.caForm.controls.state.errors) {
        this.formStatusMessage = 'State is a required field.'
      }
    }
  }

  public showCAForm() {
    this.caForm.reset()
    this.formStatusMessage = ''
    this.formSuccessMessage = ''
    $('#caForm').modal('show')
  }

  public closeCAForm() {
    $('#caForm').modal('hide')
    this.caFormClosed.emit()
  }

}
