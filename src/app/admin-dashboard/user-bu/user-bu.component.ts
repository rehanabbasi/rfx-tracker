import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { AdminService, User, BusinessUnit, UserBusinessUnit } from '../../shared/services/admin.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-user-bu',
  templateUrl: './user-bu.component.html',
  styleUrls: ['./user-bu.component.sass']
})
export class UserBuComponent implements OnInit, OnDestroy {

  public editIcon = faEdit
  public archiveIcon = faArchive

  public showUBUForm: boolean = false

  private subscriptions: Subscription[] = []
  public users: User[] = []
  public businessUnits: BusinessUnit[] = []
  public userBusinessUnits: UserBusinessUnit[] = []
  public selectedUBU: UserBusinessUnit = null
  public selectedUBUForDelete: UserBusinessUnit = null

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.userBusinessUnits.subscribe( userBusinessUnits => {
        this.userBusinessUnits = userBusinessUnits
      }),
      this._admin.users.subscribe( users => {
        this.users = users
      }),
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
    this.showUBUForm = false
    this.selectedUBU = null
  }

  public editUBU(userBusinessUnit: UserBusinessUnit): void {
    this.selectedUBU = userBusinessUnit
    this.showUBUForm = true
  }

  public deleteUBU(userBusinessUnit: UserBusinessUnit): void {
    this.selectedUBUForDelete = userBusinessUnit
  }

  public getUserName(user_id: string): string {
    let userObjs: User[] = this.users.filter( user => {
      return user.id === user_id
    })
    return userObjs.length > 0 ? userObjs[0].name : ''
  }

  public getBUName(bu_id: string): string {
    let buObjs: BusinessUnit[] = this.businessUnits.filter( businessUnit => {
      return businessUnit.id === bu_id
    })
    return buObjs.length > 0 ? buObjs[0].name : ''
  }

}
