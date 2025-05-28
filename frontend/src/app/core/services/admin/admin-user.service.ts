import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { usersResponse } from '../../models/admin/users-result';
import * as url from '../../../data/url'
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private http : HttpClient,private toast : ToastrService) { }
    //USERS
    getAllUsers(
      filters: {
        // Added all fillters here
        page?: number;
        limit?: number;
        timeRange?: string;
        name?: string;
      } = {}
    ): Observable<usersResponse> {
      let params = new HttpParams();
      if (filters.page) params = params.append('page', filters.page);
      if (filters.limit) params = params.append('limit', filters.limit);
      if (filters.timeRange)
        params = params.append('timeRange', filters.timeRange);
      if (filters.name) params = params.append('name', filters.name);
      
      return this.http.get<usersResponse>(url.ADMIN_GET_USERS,{params}).pipe(tap({
        next : (res) => {
          console.log(res);
        },
        error : (err) => {
          console.log(err);
          this.toast.error('Get all users failed')
        }
      }))
    }

    getUserById(id : string){
      return this.http.get(url.ADMIN_GET_USER_BY_ID +'/'+id)
    }
    
    createUser(user : User){
      return this.http.post(url.ADMIN_CREATE_USER, user)
    }

    changeRoleUser(id : string,role: string){
      return this.http.put(url.ADMIN_CHANGE_ROLE_USER +'/'+id, {role})
    }

    changeAccessUser(id : string,block:boolean){
      return this.http.put(url.ADMIN_CHANGE_ACCESS_USER +'/'+id, {})
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
