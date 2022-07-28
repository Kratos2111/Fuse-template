import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUsers } from './users/users.component';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
    ) { }
  getUsers(url: string) : Observable<any>{
    return this.http.get(url);
  }
  updateUser(url: string, data: IUsers) : Observable<any>{
    return this.http.put(url, data);
  }
  addUser(url: string, data: IUsers) : Observable<any>{
    return this.http.post(url, data);
  }
  
  deleteUser(url: string) : Observable<any>{
    return this.http.delete(url);
  }
}
