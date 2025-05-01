import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import { User } from '../../../../core/models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  paginationWindow: number[] = [];
  popupVisible: boolean = false;
  deleteUser: User | null = null;


  searchTerm: string = '';
  selectedDate:string = 'Date';
  page: number = 1;
  totalPages: number = 1;
  deleteId:string = '';

  statusDropdownOpen = false;
  dateDropdownOpen = false;


  constructor(private adminService: AdminService
    ,private toast: ToastrService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  filterUsers(page: number = 1) {
    // If both filters are at their default, load all scans
    if (
      (this.selectedDate === 'Date' || !this.selectedDate) &&
       (!this.searchTerm.trim()) && page==1
    ) {
      this.loadUsers();
      return;
    }

    // Prepare query params
    const params:{
      // Added all fillters here
      page?: number;
      limit?: number;
      timeRange?: string;
      name?: string;
    }  = {};
    if (this.selectedDate !== 'Date' && this.selectedDate) {
      params.timeRange = this.selectedDate;
    }
  
    if (this.searchTerm.trim()) {
      params.name = this.searchTerm;    
    }
    params.page = page;
    console.log(params);
    

    this.adminService.getAllUsers(params).subscribe({
      next: (res) => {
        this.users = Object.values(res.users);
        this.page = res.page;
        this.totalPages = res.totalPages;
        if (this.users.length === 0) {
          this.toast.info('No scans found for the selected filters');
        }
      },
      error: (err) => {
        this.users = [];
        this.toast.info('No scans found for the selected filters');
      }
    });
  }

  search(event : string){
    this.searchTerm = event;
    this.filterUsers();
  }

  reset(){
    this.selectedDate = 'Date';
    this.searchTerm = '';
    this.loadUsers();
  }

  loadUsers(page: number = 1) {
    // Replace with your actual API call and pagination logic
    this.adminService.getAllUsers({page:1}).subscribe((response: any) => {
      this.users = response.users;
      this.page = response.page;
      this.totalPages = response.totalPages;
      this.updatePaginationWindow();
    });
  }

  
  selectDate(date: string) {
    this.selectedDate = date;
    this.dateDropdownOpen = false;
    this.filterUsers();
  }

  updatePaginationWindow() {
    // Simple pagination window logic (show 5 pages at a time)
    const windowSize = 5;
    let start = Math.max(1, this.page - Math.floor(windowSize / 2));
    let end = Math.min(this.totalPages, start + windowSize - 1);
    if (end - start < windowSize - 1) {
      start = Math.max(1, end - windowSize + 1);
    }
    this.paginationWindow = [];
    for (let i = start; i <= end; i++) {
      this.paginationWindow.push(i);
    }
  }

  goToPage(page: number) {
    if (page !== this.page && page >= 1 && page <= this.totalPages) {
      this.loadUsers(page);
    }
  }

  showPopup(user: User) {
    this.deleteUser = user;
    this.popupVisible = true;
  }

  confirmDelete(event: boolean) {
    if (this.deleteUser) {
      this.adminService.deleteUser(this.deleteUser._id).subscribe(() => {
        this.popupVisible = event;
        this.loadUsers(this.page);
      });
    }
  }

  cancelDelete(event: boolean) {
    this.popupVisible = event;
    this.deleteUser = null;
  }
}
