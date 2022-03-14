import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './Pages/index/index.component';
import { PortfolioComponent } from './Pages/portfolio/portfolio.component';
import { LayoutComponent } from './Shared/layout/layout.component';

const routes: Routes = [
  {
    path: '', 
    component: LayoutComponent, 
    children: [
      { path: '', component: IndexComponent },
      { path: ':category', component: PortfolioComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }