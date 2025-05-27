import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loaderSubscriber:BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loaderObservable: Observable<boolean> ;

  constructor() { 
    this.loaderObservable = this.loaderSubscriber.asObservable();
  }
  showLoader(){
    this.loaderSubscriber.next(true);
  }
  hideLoader(){
    this.loaderSubscriber.next(false);
  }
  get LoaderStatus(){
    return this.loaderSubscriber.getValue()
  }
}
