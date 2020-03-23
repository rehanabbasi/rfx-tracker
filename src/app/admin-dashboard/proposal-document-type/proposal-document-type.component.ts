import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { AdminService, ProposalDocumentType } from '../../shared/services/admin.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-proposal-document-type',
  templateUrl: './proposal-document-type.component.html',
  styleUrls: ['./proposal-document-type.component.sass']
})
export class ProposalDocumentTypeComponent implements OnInit, OnDestroy {

  public editIcon = faEdit
  public archiveIcon = faArchive

  public showPDTForm: boolean = false

  private subscriptions: Subscription[] = []
  public proposalDocumentTypes: ProposalDocumentType[] = []
  public selectedPDT: ProposalDocumentType = null
  public deletePDTid: string = ''

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.proposalDocumentTypes.subscribe( proposalDocumentTypes => {
        this.proposalDocumentTypes = proposalDocumentTypes
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }

  public formClosed(): void {
    this.showPDTForm = false
    this.selectedPDT = null
  }

  public editPDT(proposalDocumentType: ProposalDocumentType): void {
    this.selectedPDT = proposalDocumentType
    this.showPDTForm = true
  }

  public deletePDT(pdtId: string): void {
    this.deletePDTid = pdtId
  }

}
