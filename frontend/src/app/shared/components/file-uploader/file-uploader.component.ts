import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MriScanService } from '../../../core/services/mri-scan.service';
import { allowedExtensions, MriScan } from '../../../core/models/mri-scan.model';
import { AiService } from '../../../core/services/ai.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css',
})
export class FileUploaderComponent implements OnInit {
  selectedFiles: File[] = [];
  sampleImagePaths: string[] = [
    '/assets/sample/1.png',
    '/assets/sample/2.png',
    'assets/sample/3.png',
    'assets/sample/4.png',
    'assets/sample/5.png',
    'assets/sample/6.png',
    'assets/sample/7.png',
  ];
  @Input() view_type !: string;
  
  previewUrls: (string | ArrayBuffer | null)[] = [];
  isUploading = false;
  uploadProgress: number[] = []; // Progress percentage for each file
  @Output() uploadSuccess = new EventEmitter<string[]>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private aiService: AiService
  ) {}

  ngOnInit(): void {
    // Load sample images for testing CSS
    // this.loadSampleImages();
  }

  loadSampleImages(): void {
    this.sampleImagePaths.forEach(path => {
      this.http.get(path, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const fileName = path.split('/').pop() || 'sample.png';
          const fileType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';
          const file = new File([blob], fileName, { type: fileType });
          
          this.selectedFiles.push(file);
          
          // Create preview URL
          const reader = new FileReader();
          reader.onload = () => {
            this.previewUrls.push(reader.result);
          };
          reader.readAsDataURL(file);
        },
        error: (err) => {
          console.error(`Failed to load sample image: ${path}`, err);
        }
      });
    });
  }
  
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Clear previous selections
      this.selectedFiles = [];
      this.previewUrls = [];
      
      
      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExtension = this.getFileExtension(file);
        
        if (!allowedExtensions.includes(fileExtension)) {
          this.toastr.error(`File "${file.name}" has an invalid type. Please upload JPG, JPEG, PNG, or DICOM files.`);
          continue;
        }
        
        // Add to selected files
        this.selectedFiles.push(file);
        this.previewUrls.push(null); // Placeholder for preview
        
        // Generate preview for this file
        this.previewFile(this.selectedFiles.length - 1);
      }
      
      if (this.selectedFiles.length > 0) {
        this.toastr.success(`${this.selectedFiles.length} file(s) selected`);
      }
    }
  }
  
  previewFile(index: number): void {
    if (!this.selectedFiles[index]) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrls[index] = reader.result;
    };
    reader.readAsDataURL(this.selectedFiles[index]);
  }

  uploadFiles(): void {
    if (this.selectedFiles.length === 0) {
      this.toastr.error('Please select files first.');
      return;
    }

    this.isUploading = true;
    this.uploadProgress = new Array(this.selectedFiles.length).fill(0); // Reset progress
    
    const uploadPromises: Promise<any>[] = [];
    const successfulUploads: string[] = [];
    
    // Upload each file
    this.selectedFiles.forEach((file, index) => {
      const fileExtension = this.getFileExtension(file);
      const mriscan: MriScan = {
        imageFile: file,
        metadata: {
          type: 'MRI',
          view_type: this.view_type,
          fileType: fileExtension as 'jpg' | 'jpeg' | 'png' | 'dicom'
        }
      };
      
      const uploadPromise = new Promise<string>((resolve, reject) => {
        this.aiService.processMRI(mriscan).subscribe({
          next: (event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.UploadProgress:
                if (event.total) {
                  this.uploadProgress[index] = Math.round(
                    (100 * event.loaded) / event.total
                  );
                }
                break;
              case HttpEventType.Response:
                resolve(event.body.fileUrl);
                break;
            }
          },
          error: (err) => {
            this.toastr.error(`Failed to upload "${file.name}". ${err.error?.message || 'Unknown error'}`);
            reject(err);
          },
        });
      });
      
      uploadPromises.push(uploadPromise);
    });
    
    // Handle all uploads
    Promise.allSettled(uploadPromises).then(results => {
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          successfulUploads.push(result.value);
        }
      });
      
      if (successfulUploads.length > 0) {
        this.toastr.success(`${successfulUploads.length} of ${this.selectedFiles.length} files uploaded successfully!`);
        this.uploadSuccess.emit(successfulUploads);
      }
      
      this.resetUpload();
    });
  }

  resetUpload(): void {
    this.selectedFiles = [];
    this.previewUrls = [];
    this.uploadProgress = [];
    this.isUploading = false;
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  getFileExtension(file: File): string {
    // Split the file name by '.' and get the last part
    const parts = file.name.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1].toLowerCase(); // Return the extension in lowercase
    }
    return ''; // No extension found
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // Optionally add visual feedback for dragging
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileSelection(files);
    }
  }

  handleFileSelection(files: FileList): void {
    // Clear previous selections
    this.selectedFiles = [];
    this.previewUrls = [];
    
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'dicom'];
    
    // Process each file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = this.getFileExtension(file);
      
      if (!allowedExtensions.includes(fileExtension)) {
        this.toastr.error(`File "${file.name}" has an invalid type. Please upload JPG, JPEG, PNG, or DICOM files.`);
        continue;
      }
      
      // Add to selected files
      this.selectedFiles.push(file);
      this.previewUrls.push(null); // Placeholder for preview
      
      // Generate preview for this file
      this.previewFile(this.selectedFiles.length - 1);
    }
    
    if (this.selectedFiles.length > 0) {
      this.toastr.success(`${this.selectedFiles.length} file(s) selected`);
    }
  }
}
