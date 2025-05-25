import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MriScanService } from '../../../core/services/mri-scan.service';
import {
  allowedExtensions,
  MriScan,
} from '../../../core/models/mri-scan.model';
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
  @Input() view_type!: string;
  save = false;
  previewUrls: (string | ArrayBuffer | null)[] = [];
  isUploading = false;
  uploadProgress: number[] = [];
  @Output() uploadSuccess = new EventEmitter<true>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private aiService: AiService,
  ) {}

  ngOnInit(): void {
    // Load sample images for testing CSS
    this.loadSampleImages();
  }

  loadSampleImages(): void {
    this.sampleImagePaths.forEach((path) => {
      this.http.get(path, { responseType: 'blob' }).subscribe({
        next: (blob) => {
          const fileName = path.split('/').pop() || 'sample.png';
          const fileType = fileName.endsWith('.png')
            ? 'image/png'
            : 'image/jpeg';
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
        },
      });
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFiles = [];
      this.previewUrls = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExtension = this.getFileExtension(file);

        if (!allowedExtensions.includes(fileExtension)) {
          this.toastr.error(
            `File "${file.name}" has an invalid type. Please upload JPG, JPEG, PNG, or DICOM files.`
          );
          continue;
        }

        this.selectedFiles.push(file);
        this.previewUrls.push(null);
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

  saveFilesLocally(): void {
    this.selectedFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        localStorage.setItem(`file_${index}`, fileData as string);
      };
      reader.readAsDataURL(file);
    });
  }

  // Add this method to your component class
  
  getProgressBackground(index: number, progress: number): string {
    // Calculate the progress percentage for conic gradient
    const progressPercentage = `${progress}%`;
    
    // Return different gradient based on view type
    if (this.view_type === 'axial') {
      return `conic-gradient(#00fff0 ${progressPercentage}, transparent ${progressPercentage})`;
    } else if (this.view_type === 'coronal') {
      return `conic-gradient(#ff8ae2 ${progressPercentage}, transparent ${progressPercentage})`;
    } else if (this.view_type === 'sagittal') {
      return `conic-gradient(#38bdf8 ${progressPercentage}, transparent ${progressPercentage})`;
    }
    
    // Default gradient
    return `conic-gradient(var(--blue) ${progressPercentage}, transparent ${progressPercentage})`;
  }
  
  // Modify the uploadFiles method to simulate progress
  // Since your current implementation doesn't actually track real progress
  // This simulates progress for demonstration purposes
  
  uploadFiles(): void {
    if (this.selectedFiles.length === 0) {
      this.toastr.error('Please select files first.');
      return;
    }
  
    this.isUploading = true;
    this.uploadProgress = new Array(this.selectedFiles.length).fill(0);
  
    // Simulate upload progress for each file
    this.selectedFiles.forEach((file, index) => {
      const simulateProgress = setInterval(() => {
        if (this.uploadProgress[index] < 100) {
          this.uploadProgress[index] += Math.floor(Math.random() * 10) + 1;
          if (this.uploadProgress[index] > 100) {
            this.uploadProgress[index] = 100;
          }
        } else {
          clearInterval(simulateProgress);
          
          // When all files reach 100%, complete the upload process
          if (this.uploadProgress.every(progress => progress === 100)) {
            // Process the actual upload logic
            this.completeUpload();
          }
        }
      }, 300);
    });
  }
  
  // Add this method to handle the completion of uploads
  completeUpload(): void {
    const file = this.selectedFiles[0];
    const fileExtension = this.getFileExtension(file);
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
  
      const mriscan = {
        base64Image,
        metadata: {
          name: '',
          age: 22,
          gender: 'Male',
          type: 'MRI',
          view_type: this.view_type,
          fileType: fileExtension as 'jpg' | 'jpeg' | 'png' | 'dicom',
        },
      };
  
      const uniqueKey = `mriscan_${file.name}_${Date.now()}`;
      localStorage.setItem(uniqueKey, JSON.stringify(mriscan));
  
      // Finish UI workflow
      setTimeout(() => {
        this.uploadSuccess.emit(true);
        this.toastr.success('Files uploaded successfully');
        setTimeout(() => this.resetUpload(), 1500);
      }, 500);
    };
  
    reader.readAsDataURL(file);
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
    const parts = file.name.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1].toLowerCase();
    }
    return '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
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
    this.selectedFiles = [];
    this.previewUrls = [];

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'dicom'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = this.getFileExtension(file);

      if (!allowedExtensions.includes(fileExtension)) {
        this.toastr.error(
          `File "${file.name}" has an invalid type. Please upload JPG, JPEG, PNG, or DICOM files.`
        );
        continue;
      }

      this.selectedFiles.push(file);
      this.previewUrls.push(null);
      this.previewFile(this.selectedFiles.length - 1);
    }

    if (this.selectedFiles.length > 0) {
      this.toastr.success(`${this.selectedFiles.length} file(s) selected`);
    }
  }
}
