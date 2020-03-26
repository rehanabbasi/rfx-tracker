import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { AdminService, User, RfxCategory, UserCategory } from '../../shared/services/admin.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-user-cat',
  templateUrl: './user-cat.component.html',
  styleUrls: ['./user-cat.component.sass']
})
export class UserCatComponent implements OnInit, OnDestroy {

  public editIcon = faEdit
  public archiveIcon = faArchive

  public showUCForm: boolean = false

  private subscriptions: Subscription[] = []
  public users: User[] = []
  public rfxCategories: RfxCategory[] = []
  public userCategories: UserCategory[] = []
  public selectedUC: UserCategory = null
  public selectedUCForDelete: UserCategory = null

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this._admin.userCategories.subscribe( userCategories => {
        this.userCategories = userCategories
      }),
      this._admin.users.subscribe( users => {
        this.users = users
      }),
      this._admin.rfxCategories.subscribe( rfxCategories => {
        this.rfxCategories = rfxCategories
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe()
    })
  }

  public formClosed(): void {
    this.showUCForm = false
    this.selectedUC = null
  }

  public editUC(userCategory: UserCategory): void {
    this.selectedUC = userCategory
    this.showUCForm = true
  }

  public deleteUC(userCategory: UserCategory): void {
    this.selectedUCForDelete = userCategory
  }

  public getUserName(user_id: string): string {
    let userObjs: User[] = this.users.filter( user => {
      return user.id === user_id
    })
    return userObjs.length > 0 ? userObjs[0].name : ''
  }

  public getRFxCategoryName(cat_id: string): string {
    let catObjs: RfxCategory[] = this.rfxCategories.filter( rfxCategory => {
      return rfxCategory.id === cat_id
    })
    return catObjs.length > 0 ? catObjs[0].code + ' - ' + catObjs[0].display_text : ''
  }

}
