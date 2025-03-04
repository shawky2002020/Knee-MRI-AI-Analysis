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

  ngAfterViewInit(): void {
    const video = this.videoElement.nativeElement;
    video.play().catch(() => {
      console.log('Autoplay prevented, attempting to play manually.');
      video.muted = true;
      video.play();
    });

    this.t1
      .from(video, { opacity: 0,scaleX:1.5,rotate:360 ,duration: 2 , ease: 'power3.inOut' })
      .from(
        this.text.nativeElement,
        { opacity: 0,skewX:25 ,duration: 1, ease: 'power3.inOut' },
        '>-1'
      )
      .from(
        this.upload.nativeElement,
        { opacity: 0,y:'40vh', duration: 2, ease: 'power3.inOut' },
        '>-1'
      );
  }

  uploadedFileUrl: string | null = null;

  onUploadSuccess(fileUrl: string) {
    this.uploadedFileUrl = fileUrl;
  }
}
