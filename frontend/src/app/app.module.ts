import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './features/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MriModule } from './features/mri/mri.module';
import { ToastrModule } from 'ngx-toastr';
import { NotificationModule } from './shared/components/notification/notification.module';
import { SidebarComponent } from './shared/components/layout/sidebar/sidebar.component';
import { FooterComponent } from './shared/components/layout/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AuthModule,
    SharedModule,
    ToastrModule.forRoot({    // Global toastr configuration
      closeButton: true, // Show close button
      newestOnTop: true, // New toasts appear on top
      progressBar: true, // Show progress bar
      positionClass: 'toast-bottom-right', // Toast position
      preventDuplicates: true, // Prevent duplicate toasts
      timeOut: 5000, // Timeout for the toast
      extendedTimeOut: 1000, // Additional time on hover
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
