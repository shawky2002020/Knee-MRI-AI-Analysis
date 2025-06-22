import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import gsap from 'gsap';
// import { ThemeService } from '../../core/services/theme.service';
import { MriScanService } from '../../core/services/mri-scan.service';
import { MriDiagnosticResponse } from '../../core/models/ai-result.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit,OnInit {
  latestScans: MriDiagnosticResponse[] = [];
  totalScans: number = 0;
  totalViewed: number = 0;
  loading: boolean = false;
  constructor(private userService: UserService,private scansService:MriScanService) {
    // themeService.switchToLightTheme()
  }
  ngOnInit(): void {
    this.getLastScans()
  }
  t1 = gsap.timeline();
  @ViewChild('cardcontainerEl') cardContainer!: ElementRef;
  @ViewChild('bgEl') bg!: ElementRef;
  @ViewChild('headerEl') header!: ElementRef;
  @ViewChild('recentEl') recent!: ElementRef;
  ngAfterViewInit(): void {
    
   
  }
  getLastScans() {
    this.loading =true;
    this.scansService.getScans({limit:5}).subscribe({
      next: (res) => {
        this.totalScans = res.totalScans;
        this.loading = false;
        this.latestScans = res.scans;
      },
    });
  }

  user: User = this.userService.currentUser;
}
