import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './Shared/layout/layout.component';
import { IndexComponent } from './Pages/index/index.component';
import { PortfolioComponent } from './Pages/portfolio/portfolio.component';
import { FormModalComponent } from './Shared/form-modal/form-modal.component';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgChartsModule } from 'ng2-charts';
import { AuthLayoutComponent } from './Shared/auth-layout/auth-layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    IndexComponent,
    PortfolioComponent,
    FormModalComponent,
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
