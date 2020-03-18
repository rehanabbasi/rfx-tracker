import { Routes } from '@angular/router'

import { BusinessUnitComponent } from './business-unit/business-unit.component'
import { ClientAgencyComponent } from './client-agency/client-agency.component'

export const AdminDashboardRoutes: Routes = [
  { path: '', redirectTo: 'business-unit', pathMatch: 'full'},
  { path: 'business-unit', component: BusinessUnitComponent },
  { path: 'client-agency', component: ClientAgencyComponent }
]
