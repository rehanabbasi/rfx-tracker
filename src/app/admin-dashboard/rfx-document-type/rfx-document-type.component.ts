import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { AdminService, RfxDocumentType } from '../../shared/services/admin.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-rfx-document-type',
  templateUrl: './rfx-document-type.component.html',
  styleUrls: ['./rfx-document-type.component.sass']
})
export class RfxDocumentTypeComponent implements OnInit, OnDestroy {

  public editIcon = faEdit
  public archiveIcon = faArchive

  public showRDTForm: boolean = false

  private subscriptions: Subscription[] = []
  public rfxDocumentTypes: RfxDocumentType[] = []
  public selectedRDT: RfxDocumentType = null
  public selectedRDTForStatus: RfxDocumentType = null

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.rfxDocumentTypes.subscribe( rfxDocumentTypes => {
        this.rfxDocumentTypes = rfxDocumentTypes
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }

  public formClosed(): void {
    this.showRDTForm = false
    this.selectedRDT = null
  }

  public editRDT(rfxDocumentType: RfxDocumentType): void {
    this.selectedRDT = rfxDocumentType
    this.showRDTForm = true
  }

  public updateRDTstatus(rfxDocumentType: RfxDocumentType): void {
    this.selectedRDTForStatus = rfxDocumentType
  }

}
