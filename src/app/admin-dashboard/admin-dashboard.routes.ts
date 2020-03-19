import { Routes } from '@angular/router'

import { BusinessUnitComponent } from './business-unit/business-unit.component'
import { ClientAgencyComponent } from './client-agency/client-agency.component'
import { RfxCategoryComponent } from './rfx-category/rfx-category.component'
import { RfxTypeComponent } from './rfx-type/rfx-type.component'

export const AdminDashboardRoutes: Routes = [
  { path: '', redirectTo: 'business-unit', pathMatch: 'full'},
  { path: 'business-unit', component: BusinessUnitComponent },
  { path: 'client-agency', component: ClientAgencyComponent },
  { path: 'rfx-category', component: RfxCategoryComponent },
  { path: 'rfx-type', component: RfxTypeComponent }
]
