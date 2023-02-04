import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserInterface } from '../models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api`;

  constructor(private http: HttpClient) { }

  login(formData: FormData) {
    return this.http.post(this.apiUrl+'/login', formData, {withCredentials: true});
  }

  logout(){
    return this.http.get(this.apiUrl+'/logout', {withCredentials: true});
  }

  checkUser(){
    return this.http.get<UserInterface>(this.apiUrl+'/user', {withCredentials: true});
  }

  createUser(formData: FormData){
    return this.http.post(this.apiUrl+'/createUser', formData, {withCredentials: true});
  }
}
