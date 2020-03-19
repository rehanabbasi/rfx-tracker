import { Component, OnInit, OnDestroy } from '@angular/core';
import { faEdit, faArchive } from '@fortawesome/free-solid-svg-icons';
import { AdminService, RfxCategory } from '../../shared/services/admin.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-rfx-category',
  templateUrl: './rfx-category.component.html',
  styleUrls: ['./rfx-category.component.sass']
})
export class RfxCategoryComponent implements OnInit, OnDestroy {

  public editIcon = faEdit
  public archiveIcon = faArchive

  public showRCForm: boolean = false

  private subscriptions: Subscription[] = []
  public rfxCategories: RfxCategory[] = []
  public selectedRC: RfxCategory = null
  public deleteRCid: string = ''

  constructor(
    private _admin: AdminService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
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
    this.showRCForm = false
    this.selectedRC = null
  }

  public editRC(rfxCategory: RfxCategory): void {
    this.selectedRC = rfxCategory
    this.showRCForm = true
  }

  public deleteRC(rcId: string): void {
    this.deleteRCid = rcId
  }

}
