import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate, loggedIn } from '@angular/fire/auth-guard';

import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PreRfxSearchComponent } from './pre-rfx-search/pre-rfx-search.component';
import { PreRfxAddComponent } from './pre-rfx-add/pre-rfx-add.component';

import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { LoggedOutGuard } from './shared/guards/logged-out.guard';
import { AdminGuard } from './shared/guards/admin.guard';

import { AdminDashboardRoutes } from './admin-dashboard/admin-dashboard.routes'


const routes: Routes = [
  { path: '', redirectTo: 'pre-rfx-search', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'pre-rfx-search', component: PreRfxSearchComponent, canActivate: [LoggedInGuard] },
  { path: 'pre-rfx-add', component: PreRfxAddComponent, canActivate: [LoggedInGuard]},
  { path: 'pre-rfx-edit/:id', component: PreRfxAddComponent, canActivate: [LoggedInGuard]},
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard], children: AdminDashboardRoutes }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
