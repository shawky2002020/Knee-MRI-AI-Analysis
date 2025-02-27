import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
  uploadedFileUrl: string | null = null;

  onUploadSuccess(fileUrl: string) {
    this.uploadedFileUrl = fileUrl;
  }
  
}