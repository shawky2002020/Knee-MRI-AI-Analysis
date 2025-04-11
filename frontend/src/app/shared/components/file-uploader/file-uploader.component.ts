import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MriScanService } from '../../../core/services/mri-scan.service';
import { MriScan } from '../../../core/models/mri-scan.model';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css',
})
export class FileUploaderComponent {
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isUploading = false;
  uploadProgress = 0; // Progress percentage
  @Output() uploadSuccess = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private mriService: MriScanService
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'dicom'];
      const fileExtension = this.getFileExtension(file);
  
      if (!allowedExtensions.includes(fileExtension)) {
        this.toastr.error('Invalid file type. Please upload a JPG, JPEG, PNG, or DICOM file.');
        return;
      }
  
      // Proceed with the upload
      this.selectedFile = file;
      this.previewFile()
    }
  }
  
  previewFile(): void {
    if (!this.selectedFile) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      this.toastr.error('Please select a file first.');
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0; // Reset progress
    const fileExtension = this.getFileExtension(this.selectedFile);
    const mriscan : MriScan= {
      imageFile:this.selectedFile,
      metadata:{type:'MRI',view_type:'axial',fileType:fileExtension as 'jpg' | 'jpeg' | 'png' | 'dicom'}

    }

    this.mriService.uploadMri(mriscan).subscribe({
      next: (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.uploadProgress = Math.round(
                (100 * event.loaded) / event.total
              );
            }
            break;
          case HttpEventType.Response:
            this.toastr.success('File uploaded successfully!');
            this.uploadSuccess.emit(event.body.fileUrl);
            this.resetUpload();
            break;
        }
      },
      error: (err) => {
        this.toastr.error('File upload failed. Please try again.', err.error.message);
        this.isUploading = false;
      },
    });
  }

  resetUpload(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.uploadProgress = 0;
    this.isUploading = false;
  }


  getFileExtension(file: File): string {
    // Split the file name by '.' and get the last part
    const parts = file.name.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1].toLowerCase(); // Return the extension in lowercase
    }
    return ''; // No extension found
  }
}
