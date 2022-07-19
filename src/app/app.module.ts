import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './Shared/layout/layout.component';
import { IndexComponent } from './Pages/index/index.component';
import { PortfolioComponent } from './Pages/portfolio/portfolio.component';
import { FormModalComponent } from './Shared/form-modal/form-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgChartsModule } from 'ng2-charts';
import { AuthLayoutComponent } from './Shared/auth-layout/auth-layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { API_URL, environment } from 'src/environments/environment';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { ScrollableChartComponent } from './Shared/scrollable-chart/scrollable-chart.component';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    IndexComponent,
    PortfolioComponent,
    FormModalComponent,
    AuthLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ScrollableChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgChartsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.apiUrl],
        // disallowedRoutes: ["http://example.com/examplebadroute/"],
      }
    }),
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.apiUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
