import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  page: number = 1;
  totalPages: number = 1;
  paginationWindow: number[] = [];
  popupVisible: boolean = false;
  deleteUser: User | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
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
