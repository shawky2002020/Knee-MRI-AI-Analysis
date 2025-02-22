import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() title: string = '';  // Modal title
  @Input() show: boolean = false;  // Visibility state
  @Output() close = new EventEmitter<void>();  // Event when closed

  closeModal() {
    this.close.emit();  // Emit close event
  }
}
