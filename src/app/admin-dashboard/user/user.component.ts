import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { AdminService, User, UserRole } from '../../shared/services/admin.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit, OnDestroy {

  public editIcon = faEdit
  public archiveIcon = faArchive

  public showUSRForm: boolean = false

  private subscriptions: Subscription[] = []
  public users: User[] = []
  public userRoles: UserRole[] = []
  public selectedUSR: User = null
  public selectedUSRForStatus: User = null

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.users.subscribe( users => {
        this.users = users
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
    this.showUSRForm = false
    this.selectedUSR = null
  }

  public editUSR(user: User): void {
    this.selectedUSR = user
    this.showUSRForm = true
  }

  public updateUSRstatus(user: User): void {
    this.selectedUSRForStatus = user
  }

  public getRoleText(role_id: string): string {
    let roleObj: UserRole[] = this.userRoles.filter( role => {
      return role.id === role_id
    })
    return roleObj.length > 0 ? roleObj[0].name : ''
  }

}