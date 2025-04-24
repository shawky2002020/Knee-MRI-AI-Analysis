import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import gsap from 'gsap';
import { MriScanService } from '../../../core/services/mri-scan.service';
import { AiService } from '../../../core/services/ai.service';
import { MriScan } from '../../../core/models/mri-scan.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('uploadEl') upload!: ElementRef<any>;
  @ViewChild('textEl') text!: ElementRef<any>;
  t1 = gsap.timeline();

  uploadedFileUrls: string[] = [];
  constructor(
    private toastr : ToastrService,
    private aiService : AiService
  ){}
  ngAfterViewInit(): void {
    // Retrieve mriscan from local storage
    const mriscanData = localStorage.getItem('mriscan');
    if (mriscanData) {
      const mriscan = JSON.parse(mriscanData);
      console.log('Retrieved mriscan:', mriscan);
      // Use the mriscan object as needed
    }
    // GSAP animations
    // const video = this.videoElement.nativeElement;
    // video.play().catch(() => {
    //   console.log('Autoplay prevented, attempting to play manually.');
    //   video.muted = true;
    //   video.play();
    // });

    // this.t1
    //   .from(video, { opacity: 0, scaleX: 1.5, rotate: 360, duration: 2, ease: 'power3.inOut' })
    //   .from(
    //     this.text.nativeElement,
    //     { opacity: 0, skewX: 25, duration: 1, ease: 'power3.inOut' },
    //     '>-1'
    //   )
    //   .from(
    //     this.upload.nativeElement,
    //     { opacity: 0, scale: 1.5, y: '40vh', duration: 2, ease: 'power3.inOut' },
    //     '>-1'
    //   );
  }

  onUploadSuccess(fileUrls: string[]) {
    this.uploadedFileUrls = [...this.uploadedFileUrls, ...fileUrls];
    this.uploadedFileUrls = Array.from(new Set(this.uploadedFileUrls));
  }

  retrieveScansFromLocalStorage(): MriScan[] {
    const scans: MriScan[] = [];
    const keys = Object.keys(localStorage).filter(key => key.startsWith('mriscan_'));
  
    keys.forEach(key => {
      const scanData = localStorage.getItem(key);
      if (scanData) {
        const mriscan = JSON.parse(scanData) as MriScan;
        scans.push(mriscan);
      }
    });
  
    return scans;
  }

  

  submitFiles(): void {
    const scans = this.retrieveScansFromLocalStorage();
    console.log('scans',scans);
    
    if (scans.length === 0) {
      this.toastr.error('No scans to submit.');
      return;
    }
  
    // Implement the logic to submit scans to the server
    this.aiService.processMRI(scans).subscribe(
      (response) => {
        this.toastr.success('Scans submitted successfully.');
        console.log('Scans submitted successfully:', response);
      }
    );
  }
}
