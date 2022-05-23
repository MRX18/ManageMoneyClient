import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from './guards/anonymous.guard';
import { AuthGuard } from './guards/auth.guard';
import { IndexComponent } from './Pages/index/index.component';
import { LoginComponent } from './Pages/login/login.component';
import { PortfolioComponent } from './Pages/portfolio/portfolio.component';
import { RegisterComponent } from './Pages/register/register.component';
import { AuthLayoutComponent } from './Shared/auth-layout/auth-layout.component';
import { LayoutComponent } from './Shared/layout/layout.component';

const routes: Routes = [
  {
    path: 'home', 
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: IndexComponent },
      { path: ':category', component: PortfolioComponent }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [AnonymousGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }