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
  public selectedBUForStatus: BusinessUnit = null

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
  }

  public updateBUstatus(businessUnit: BusinessUnit): void {
    this.selectedBUForStatus = businessUnit
  }

}
