import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MetaData } from '../../../core/models/mri-scan.model';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.css']
})
export class AnalyzeComponent implements OnInit {
  userForm!: FormGroup;
  showUpload = true;
  metadata: MetaData = {} as MetaData;
  @Output() metadataChange = new EventEmitter<MetaData>();
  constructor(private fb: FormBuilder,private toast:ToastrService) {
    document.title = 'Analyze Page'
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      middleName: ['', [Validators.required, Validators.maxLength(20)]],
      familyName: ['', [Validators.required, Validators.maxLength(20)]],

      age: ['', [Validators.required, Validators.min(0), Validators.max(120)]],
      gender: ['', Validators.required],
      
    });
  }


  capitalizeName(name: string): string {
    return name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : '';
  }

  onSubmit() {
    if (this.userForm.valid) {
      const firstName = this.capitalizeName(this.userForm.value.firstName);
      const middleName = this.capitalizeName(this.userForm.value.middleName);
      const familyName = this.capitalizeName(this.userForm.value.familyName);
      const fullName = `${firstName} ${middleName} ${familyName}`;
      this.metadata = {
        name:fullName,
        age:this.userForm.value.age,
        gender:this.userForm.value.gender,
      }
      this.metadataChange.emit(this.metadata);
      this.showUpload = true;
    } else {
      this.toast.info('Please fill all required fields');
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }
}
