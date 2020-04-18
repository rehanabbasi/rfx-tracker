import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate, loggedIn } from '@angular/fire/auth-guard';

import { LoginComponent } from './login/login.component';
import { RegisterComponent }  from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PreRfxSearchComponent } from './pre-rfx-search/pre-rfx-search.component';
import { PreRfxAddComponent } from './pre-rfx-add/pre-rfx-add.component';
import { PreRfxViewComponent } from './pre-rfx-view/pre-rfx-view.component';

import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { LoggedOutGuard } from './shared/guards/logged-out.guard';
import { AdminGuard } from './shared/guards/admin.guard';

import { AdminDashboardRoutes } from './admin-dashboard/admin-dashboard.routes';


const routes: Routes = [
  { path: '', redirectTo: 'pre-rfx-search', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'user-registration/:id', component: RegisterComponent, canActivate: [LoggedOutGuard]},
  { path: 'pre-rfx-search', component: PreRfxSearchComponent, canActivate: [LoggedInGuard] },
  { path: 'pre-rfx-add', component: PreRfxAddComponent, canActivate: [LoggedInGuard]},
  { path: 'pre-rfx-edit/:id', component: PreRfxAddComponent, canActivate: [LoggedInGuard]},
  { path: 'pre-rfx-view/:id', component: PreRfxViewComponent, canActivate: [LoggedInGuard]},
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard], children: AdminDashboardRoutes }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
