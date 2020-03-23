import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { AdminService, UserRole } from '../../shared/services/admin.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.sass']
})
export class UserRoleComponent implements OnInit, OnDestroy {

  public editIcon = faEdit
  public archiveIcon = faArchive

  public showURForm: boolean = false

  private subscriptions: Subscription[] = []
  public userRoles: UserRole[] = []
  public selectedUR: UserRole = null
  public selectedURForStatus: UserRole = null

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.userRoles.subscribe( userRoles => {
        this.userRoles = userRoles
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }

  public formClosed(): void {
    this.showURForm = false
    this.selectedUR = null
  }

  public editUR(userRole: UserRole): void {
    this.selectedUR = userRole
    this.showURForm = true
  }

  public updateURstatus(userRole: UserRole): void {
    this.selectedURForStatus = userRole
  }

}