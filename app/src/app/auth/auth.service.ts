import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from './auth.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user?: User;

  constructor(
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
    private readonly router: Router
  ) {}

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await lastValueFrom(
        this.http.post<AuthResponse>(`${environment.API_URL}/auth/login`, {
          email,
          password,
        })
      );

      console.log(response);

      this.tokenService.setToken(response.token);

      // Load current user in memory
      this.user = await this.currentUser();

      return true;
    } catch (err) {
      throw err;
    }
  }

  async currentUser(): Promise<User> {
    try {
      // No token
      if (!this.tokenService.getToken()) {
        throw new Error('No token');
      }

      // User not yet fetched
      if (this.user === undefined) {
        this.user = await lastValueFrom(
          this.http.get(`${environment.API_URL}/auth/user`)
        ).then((x) => new User(x));
      }

      // Return user with success
      return this.user;
    } catch (err) {
      console.error(err);

      // No proper authentication, logout
      //this.logout();
      throw err;
    }
  }
}
