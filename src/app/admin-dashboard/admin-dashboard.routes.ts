import { Routes } from '@angular/router'

import { BusinessUnitComponent } from './business-unit/business-unit.component'
import { ClientAgencyComponent } from './client-agency/client-agency.component'
import { RfxCategoryComponent } from './rfx-category/rfx-category.component'
import { RfxTypeComponent } from './rfx-type/rfx-type.component'
import { RfxDocumentTypeComponent } from './rfx-document-type/rfx-document-type.component'
import { ProposalDocumentTypeComponent } from './proposal-document-type/proposal-document-type.component'
import { UserRoleComponent } from './user-role/user-role.component'
import {  UserComponent } from './user/user.component'

export const AdminDashboardRoutes: Routes = [
  { path: '', redirectTo: 'business-unit', pathMatch: 'full'},
  { path: 'business-unit', component: BusinessUnitComponent },
  { path: 'client-agency', component: ClientAgencyComponent },
  { path: 'rfx-category', component: RfxCategoryComponent },
  { path: 'rfx-type', component: RfxTypeComponent },
  { path: 'rfx-doc-type', component: RfxDocumentTypeComponent },
  { path: 'proposal-doc-type', component: ProposalDocumentTypeComponent },
  { path: 'user-role', component: UserRoleComponent },
  { path: 'user', component: UserComponent }
]
