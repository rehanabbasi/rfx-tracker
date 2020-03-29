import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { AdminService, RfxType } from '../../shared/services/admin.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-rfx-type',
  templateUrl: './rfx-type.component.html',
  styleUrls: ['./rfx-type.component.sass']
})
export class RfxTypeComponent implements OnInit, OnDestroy {

  public editIcon = faEdit
  public archiveIcon = faArchive

  public showRTForm: boolean = false

  private subscriptions: Subscription[] = []
  public rfxTypes: RfxType[] = []
  public selectedRT: RfxType = null
  public selectedRTForStatus: RfxType = null

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.rfxTypes.subscribe( rfxTypes => {
        this.rfxTypes = rfxTypes
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }

  public formClosed(): void {
    this.showRTForm = false
    this.selectedRT = null
  }

  public editRT(rfxType: RfxType): void {
    this.selectedRT = rfxType
    this.showRTForm = true
  }

  public updateRTstatus(rfxType: RfxType): void {
    this.selectedRTForStatus = rfxType
  }

}
