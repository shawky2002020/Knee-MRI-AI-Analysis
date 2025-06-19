import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements AfterViewInit  {
  ngAfterViewInit(): void {
    const block = document.querySelector('.block');
    const allow = document.querySelector('.allow');
    if(block && allow){
      if(this.editedUser.aiAccess){
        block.classList.remove('active');
        allow.classList.add('active');
      }else{
        allow.classList.remove('active');
        block.classList.add('active');
      }
    }
  }
  @Input() user: User | null = null;
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  editedUser!: User;

  ngOnChanges() {
    if (this.user) {
      this.editedUser = { ...this.user };
    }
  }

  onSave() {
    console.log(this.editedUser);
    
    if (this.editedUser) {
      this.save.emit(this.editedUser);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
  changeAccess(){
    this.editedUser.aiAccess=!this.editedUser.aiAccess;
  }

}