import { Component, Input } from '@angular/core';
import { diagnosticResult, MriDiagnosticResponse } from '../../../core/models/ai-result.model';
import { MriScanService } from '../../../core/services/mri-scan.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export class ReportComponent {
 DiagnosticResult!: MriDiagnosticResponse ;
  visualisation_img!: string;
  confidence: number = 98;
  meniscus_prob!:number;
  acl_prob!:number;
  status!:string;
  activeItem: string = 'scan'; // Default active item

  
  constructor(private mriService : MriScanService) {}
  ngOnInit(): void {
    this.DiagnosticResult = this.mriService.getMriScan();
    this.visualisation_img = this.DiagnosticResult.mri_scan;
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
}
