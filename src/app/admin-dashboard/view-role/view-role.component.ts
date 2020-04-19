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
  public userRoles: UserRole[] = []
  public userRolesWithAccess: UserRole[] = []
  public selectedRole: UserRole = null
  public selectedVRForDelete: UserRole = null

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.userRoles.subscribe( roles => {
        this.userRoles = roles
        this.userRolesWithAccess = roles.filter(role => {
          return role.view_access && role.view_access.length > 0
        })
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
    this.selectedRole = null
  }

  public editVR(role: UserRole): void {
    this.selectedRole = role
    this.showVRForm = true
  }

  public deleteVR(viewRole: UserRole): void {
    this.selectedVRForDelete = viewRole
  }

  public getRoleText(role_id: string): string {
    let roleObj: UserRole[] = this.userRoles.filter( role => {
      return role.id === role_id
    })
    return roleObj.length > 0 ? roleObj[0].name : ''
  }

}
