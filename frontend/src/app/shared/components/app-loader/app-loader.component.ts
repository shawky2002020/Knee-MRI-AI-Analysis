import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-app-loader',
  templateUrl: './app-loader.component.html',
  styleUrl: './app-loader.component.css'
})
export class AppLoaderComponent  {
  pageLoader:boolean = this.loadingService.LoaderStatus || false;
  constructor(private loadingService : LoaderService){
    this.loadingService.loaderObservable.subscribe({
      next:(loadStatus)=>{
        this.pageLoader = loadStatus;
        console.log('loadStatus',loadStatus);
        
      }
     });
  }
  
}
