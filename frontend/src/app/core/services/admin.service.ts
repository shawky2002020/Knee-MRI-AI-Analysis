import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as url from '../../data/url'
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient,private toast : ToastrService) { }
  getAllUsers():Observable<any>{
    return this.http.get<User[]>(url.ADMIN_GET_USERS).pipe(tap({
      next : (res) => {
        this.toast.success('Get all users successfully')
        console.log(res);
      },
      error : (err) => {
        console.log(err);
        this.toast.error('Get all users failed')
      }
    }))
  }
  deleteUser(id : string){
    return this.http.delete(url.ADMIN_DELETE_USER+'/' + id).pipe(tap({
      next : (res) => {
        this.toast.success('Delete user successfully')
        console.log(res);
      },
      error : (err) => {
        console.log(err);
        this.toast.error('Delete user failed')
      }
    }))
  }
  updateUser(id : string, user : any){
    return this.http.put(url.ADMIN_UPDATE_USER +'/'+id, user)
  }


  
}


