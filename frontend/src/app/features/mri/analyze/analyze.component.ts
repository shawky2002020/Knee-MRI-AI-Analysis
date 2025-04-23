import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {
  userForm!: FormGroup;
  showUpload = false;

  constructor(private fb: FormBuilder,private toast:ToastrService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      gender: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.showUpload = true;
    } else {
      this.toast.info('Please fill all required fields');
      this.userForm.markAllAsTouched();
    }
  }
}
