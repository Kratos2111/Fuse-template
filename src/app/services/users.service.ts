import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Query } from 'app/interfaces/query';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(private http: HttpClient) {
    
  }
  getAllUsers(){

   }
}
