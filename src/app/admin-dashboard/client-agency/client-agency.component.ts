import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { AdminService, ClientAgency } from '../../shared/services/admin.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-client-agency',
  templateUrl: './client-agency.component.html',
  styleUrls: ['./client-agency.component.sass']
})
export class ClientAgencyComponent implements OnInit, OnDestroy {

  public editIcon = faEdit
  public archiveIcon = faArchive

  public showCAForm: boolean = false

  private subscriptions: Subscription[] = []
  public clientAgencies: ClientAgency[] = []
  public selectedCA: ClientAgency = null
  public selectedCAForStatus: ClientAgency = null

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.clientAgencies.subscribe( clientAgencies => {
        this.clientAgencies = clientAgencies
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }

  public formClosed(): void {
    this.showCAForm = false
    this.selectedCA = null
  }

  public editCA(clientAgency: ClientAgency): void {
    this.selectedCA = clientAgency
    this.showCAForm = true
  }

  public updateCAstatus(clientAgency: ClientAgency): void {
    this.selectedCAForStatus = clientAgency
  }

}
