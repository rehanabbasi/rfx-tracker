import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SearchComponent } from './search/search.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SideNavComponent } from './admin-dashboard/side-nav/side-nav.component';
import { BusinessUnitComponent } from './admin-dashboard/business-unit/business-unit.component';
import { BuFormModalComponent } from './admin-dashboard/business-unit/bu-form-modal/bu-form-modal.component';
import { BuDeleteModalComponent } from './admin-dashboard/business-unit/bu-delete-modal/bu-delete-modal.component';
import { ClientAgencyComponent } from './admin-dashboard/client-agency/client-agency.component';
import { CaDeleteModalComponent } from './admin-dashboard/client-agency/ca-delete-modal/ca-delete-modal.component';
import { CaFormModalComponent } from './admin-dashboard/client-agency/ca-form-modal/ca-form-modal.component';

import { AuthService } from './shared/services/auth.service';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { LoggedOutGuard } from './shared/guards/logged-out.guard';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    AdminDashboardComponent,
    SideNavComponent,
    BusinessUnitComponent,
    ClientAgencyComponent,
    BuFormModalComponent,
    BuDeleteModalComponent,
    CaDeleteModalComponent,
    CaFormModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    LoggedInGuard,
    LoggedOutGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
