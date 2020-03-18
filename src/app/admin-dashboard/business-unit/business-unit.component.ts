import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { AdminService, BusinessUnit } from '../../shared/services/admin.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-business-unit',
  templateUrl: './business-unit.component.html',
  styleUrls: ['./business-unit.component.sass']
})
export class BusinessUnitComponent implements OnInit, OnDestroy {

  public editIcon = faEdit
  public archiveIcon = faArchive

  public showBUForm: boolean = false

  private subscriptions: Subscription[] = []
  public businessUnits: BusinessUnit[] = []
  public selectedBU: BusinessUnit = null
  public deleteBUid: string = ''

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.businessUnits.subscribe( businessUnits => {
        this.businessUnits = businessUnits
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }

  public formClosed(): void {
    this.showBUForm = false
    this.selectedBU = null
  }

  public editBU(businessUnit: BusinessUnit): void {
    this.selectedBU = businessUnit
    this.showBUForm = true
    // console.log('BU data for edit: ', businessUnit)
  }

  public deleteBU(buId: string): void {
    // console.log('BU id for delete is: ', buId)
    this.deleteBUid = buId
  }

}
