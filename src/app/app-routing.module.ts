import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate, loggedIn } from '@angular/fire/auth-guard';

import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { LoggedOutGuard } from './shared/guards/logged-out.guard';

import { AdminDashboardRoutes } from './admin-dashboard/admin-dashboard.routes'


// const adminOnly = () => hasCustomClaim('admin');
// const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
// const redirectLoggedInToSearch = () => redirectLoggedInTo(['search']);
// const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'search', component: SearchComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
//   { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } }
// ];


// export const routes: Routes = [
//     { path: 'login',        component: LoginComponent,    ...canActivate(redirectLoggedInToSearch) },
//     { path: 'search',        component: SearchComponent, ...canActivate(loggedIn) },
//     { path: 'admin-dashboard',        component: AdminDashboardComponent,    ...canActivate(loggedIn) }
// ];

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'search', component: SearchComponent, canActivate: [LoggedInGuard] },
  // { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [LoggedInGuard] }
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [LoggedInGuard], children: AdminDashboardRoutes }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
