import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  declarations: [HomeComponent, AboutComponent, FaqComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'faq', component: FaqComponent }
    ])
  ],
  exports: [HomeComponent, AboutComponent, FaqComponent]
})
export class HomeModule {}