import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.authUrl;
  private currentUser = {};
  
  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  login(user: User) {
    //console.log(user)
    //console.log(`${this.authUrl}/login`)
    
    return this.http.post<any>(`${this.authUrl}/login`, user)
    .subscribe((res:any) => {
      localStorage.setItem('access_token', res.token)
      this.router.navigate(['cellar']);
    })
  }
  getToken(){
    return localStorage.getItem('access_token');
  }
  /*
  isTokenExpired(token?: string): boolean {
    if(!token) token = this.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }*/
  isLoggedIn():boolean{
    //const user = JSON.parse(localStorage.getItem('user')|| {});
    let authToken = localStorage.getItem('access_token');
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return (authToken !== null) ? true : false;
  }
  signOut(){
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
}
