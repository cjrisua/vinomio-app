import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import jwt_decode from 'jwt-decode';
import { catchError, map, Observable, of } from 'rxjs';

interface Token {
  name: string;
  exp: number;
  // whatever else is in the JWT.
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = environment.authUrl;
  private apiUrl = environment.apiUrl;
  //public currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  login(user: User) {
    return this.http
      .post<any>(`${this.authUrl}/login`, user)
      .subscribe((res: any) => {
        //console.log(res)
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(user).subscribe((res) => {
          this.router.navigate(['cellar']);
        });
      });
  }
  // User profile
  getUserProfile(user?: User): Observable<any> {
    const token:any = this.getCurrentUser()
    const user_email = { email: token.email };

    return this.http.post<any>(`${this.apiUrl}/user/profile`, user_email).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError((val: any) => {
        console.error(`Error: ${val.error.error}`);
        return [];
      })
    );
  }
  getCurrentUser() {
    if (this.isLoggedIn()) {
      const decoded: Token = jwt_decode(this.getToken());
      return decoded;
    } else return {};
  }
  getToken(): string {
    return localStorage.getItem('access_token') as string;
  }
  getTokenExpirationDate(token: string): Date {
    const decoded: Token = jwt_decode(token);
    if (decoded.exp === undefined) return new Date(0);
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === new Date(0)) return false;
    return !(date.valueOf() > new Date().valueOf());
    //return true
  }
  isLoggedIn(): boolean {
    //const user = JSON.parse(localStorage.getItem('user')|| {});
    let authToken = localStorage.getItem('access_token');
    //return (user !== null && user.emailVerified !== false) ? true : false;
    return authToken !== null ? true : false;
  }
  signOut() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
  signUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/register`, data);
  }
}
