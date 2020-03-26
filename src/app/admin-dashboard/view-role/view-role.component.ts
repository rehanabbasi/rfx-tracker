import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faArchive, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { AdminService, ViewRole, UserRole } from '../../shared/services/admin.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.sass']
})
export class ViewRoleComponent implements OnInit, OnDestroy {

  public editIcon = faEdit
  public archiveIcon = faArchive
  public viewAccessIcon = faCheckCircle
  public viewNoAccessIcon = faTimesCircle

  public showVRForm: boolean = false

  private subscriptions: Subscription[] = []
  public viewRoles: ViewRole[] = []
  public userRoles: UserRole[] = []
  public selectedVR: ViewRole = null
  public selectedVRForDelete: ViewRole = null

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.viewRoles.subscribe( viewRoles => {
        this.viewRoles = viewRoles
      }),
      this._admin.userRoles.subscribe( roles => {
        this.userRoles = roles
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }

  public formClosed(): void {
    this.showVRForm = false
    this.selectedVR = null
  }

  public editVR(viewRole: ViewRole): void {
    this.selectedVR = viewRole
    this.showVRForm = true
  }

  public deleteVR(viewRole: ViewRole): void {
    this.selectedVRForDelete = viewRole
  }

  public getRoleText(role_id: string): string {
    let roleObj: UserRole[] = this.userRoles.filter( role => {
      return role.id === role_id
    })
    return roleObj.length > 0 ? roleObj[0].name : ''
  }

}
