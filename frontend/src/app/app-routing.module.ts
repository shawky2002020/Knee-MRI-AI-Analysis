import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './shared/components/layout/home-layout/home-layout.component';
import { AppLayoutComponent } from './shared/components/layout/app-layout/app-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminLayoutComponent } from './shared/components/layout/admin-layout/admin-layout.component';

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
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },
    ]
    
  },
  { path: '**', redirectTo: 'home' } // Redirect unknown routes
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
