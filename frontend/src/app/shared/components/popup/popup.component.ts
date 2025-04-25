import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent  {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() confirmButtonText: string = 'Confirm';
  @Input() cancelButtonText: string = 'Cancel';
  @Input() showPopup: boolean = false;
  @Output() closeEmitter = new EventEmitter<boolean>();
  @Output() confirmEmitter = new EventEmitter<boolean>();
  constructor() { }


  closePopup() {
    this.showPopup =false;
    this.closeEmitter.emit(this.showPopup);

  }


  confirm(){
    this.showPopup =false;
    this.confirmEmitter.emit(false)
  }
  
 
}