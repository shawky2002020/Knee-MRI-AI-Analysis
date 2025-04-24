import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './shared/components/layout/home-layout/home-layout.component';
import { AppLayoutComponent } from './shared/components/layout/app-layout/app-layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
      { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },


    ]
  },
  {
    path: 'app', 
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'mri', loadChildren: () => import('./features/mri/mri.module').then(m => m.MriModule) },
      { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  },
  { path: '**', redirectTo: 'home' } // Redirect unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
