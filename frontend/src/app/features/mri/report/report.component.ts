import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import {  MriDiagnosticResponse } from '../../../core/models/ai-result.model';
import { MriScanService } from '../../../core/services/mri-scan.service';
import { ReportService } from '../../../core/services/report.service';
import { gsap } from 'gsap';
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent  {
 DiagnosticResult!: MriDiagnosticResponse ;
  visualisation_img!: string;
  confidence: number = 98;
  meniscus_prob!:number;
  acl_prob!:number;
  status!:string;
  activeItem: string = 'scan'; // Default active item

  
  constructor(private mriService : MriScanService
    ,private reportService:ReportService
  ) {}
  
  ngOnInit(): void {
    
    this.DiagnosticResult = this.mriService.getMriScan();
    this.visualisation_img = this.DiagnosticResult.heat_map;
    this.acl_prob = this.DiagnosticResult.result.acl_prob *100;
    this.meniscus_prob = this.DiagnosticResult.result.meniscus_prob *100;
    this.status = this.DiagnosticResult.result.status;
    
  }
  setActiveItem(item: string): void {
    this.activeItem = item;
    if (item === 'scan') {
      this.visualisation_img = this.DiagnosticResult.mri_scan;    
    }
    else if (item ==='heatmap') {
      this.visualisation_img = this.DiagnosticResult.heat_map;
    }
  }
  @ViewChild('downloadBtnEL') downloadBtnEl!: ElementRef;
  @ViewChild('downloadIconEl') downloadIconBtnEl!: ElementRef;
  @ViewChild('downloadTextEl') downloadTextEL!: ElementRef;
  

  downloadReport(){
    const downloadBtn = this.downloadBtnEl.nativeElement  ;
    const downloadText = this.downloadTextEL.nativeElement  ;
    const downloadIconBtn = this.downloadIconBtnEl.nativeElement  ;
    const twine = gsap.timeline();
    twine
    .to(downloadText,{
      opacity:0,
      text:'',
      duration:2,
      ease:'power3.out',
    })
    .to(downloadText,{
      text:'Generating',
      duration:1,
      opacity:1,
      ease:"power3.out",
      onComplete:()=>{
        downloadBtn.classList.add('active')
       }
    })
  
    .to(downloadIconBtn,{
      transformOrigin:'right center',
      x:50,
      rotate:90,
      duration:.5,
      ease:'power3.out',
    })
    .to(downloadIconBtn,{
      x:0,
      rotate:0,
      duration:1.5,
      ease:'power3.out',
    })
    .to(downloadIconBtn,{
      repeat:-1,
      yoyo:true,
      y:10,
      ease:'power2.inOut',
    })

    
    this.reportService.generateReport(this.DiagnosticResult._id,this.DiagnosticResult.result.status,this.confidence,['axial','coronal','sagittal'],this.DiagnosticResult.createdAt,[this.DiagnosticResult.heat_map]).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ACLYZE_${this.DiagnosticResult.metadata.name.split(' ').join('') || Date.now()}_${this.DiagnosticResult._id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      downloadBtn.classList.remove('active')
      twine.kill();
      downloadText.innerHTML = 'Downloaded';
      downloadIconBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
      downloadText.style.opacity = '1';
      downloadIconBtn.style.transform = 'none';
      downloadIconBtn.style.transformOrigin = 'center';
      downloadIconBtn.style.rotate = '0';
      downloadIconBtn.style.y = '0';
      downloadBtn.style.pointerEvents = 'none';
    });
  }
  
}
