import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { API_URL } from 'src/environments/environment';
import { Register } from '../models/register';
import { Jwt, ResponseAuth } from '../models/responses/response-auth';
import { ResponseError } from '../models/responses/response-error';

export const ACCESS_TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  register(register: Register) : Observable<ResponseAuth<Jwt>|ResponseError> {
    return this.http.post<ResponseAuth<Jwt>>(`${this.apiUrl}api/auth/register`, register).pipe(tap(res => { 
      if(res.data) {
        localStorage.setItem(ACCESS_TOKEN_KEY, res.data.token);
        this.router.navigate(["home", "dashboard"]);
      }
    }));
  }

  login(email: string, password: string) : Observable<ResponseAuth<Jwt>|ResponseError> {
    return this.http.post<ResponseAuth<Jwt>>(`${this.apiUrl}api/auth/login`, {email, password}).pipe(tap(res => { 
      if(res.data) {
        localStorage.setItem(ACCESS_TOKEN_KEY, res.data.token);
        this.router.navigate(["home", "dashboard"]);
      }
    }));
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY) as string;
    return token != '' && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['auth', 'login']);
  }
}
