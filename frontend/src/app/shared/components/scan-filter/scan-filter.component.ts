import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scan-filter',
  templateUrl: './scan-filter.component.html',
  styleUrl: './scan-filter.component.css'
})
export class ScanFilterComponent {
  @Input() searchTerm: string = '';
  @Input() selectedStatus: string = '';
  @Input() selectedDate: string = '';

  @Output() search = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() dateChange = new EventEmitter<string>();

  statusDropdownOpen = false;
  dateDropdownOpen = false;

  onStatusSelect(status: string) {
    this.statusChange.emit(status);
    this.statusDropdownOpen = false;
  }

  onDateSelect(date: string) {
    this.dateChange.emit(date);
    this.dateDropdownOpen = false;
  }
}