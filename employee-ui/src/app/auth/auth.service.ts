import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  token: string;
  expiresAt: string;
}

interface TokenPayload {
  exp?: number;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'employee-api-token';
  private readonly loginUrl = 'http://localhost:5015/api/auth/login';
  private readonly browser: boolean;

  readonly isAuthenticated = signal(false);
  readonly role = signal<string | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.browser = isPlatformBrowser(platformId);
    this.isAuthenticated.set(this.hasValidToken());
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.role.set(this.decodeToken(response.token)?.role ?? null);
        this.isAuthenticated.set(true);
      })
    );
  }

  logout(): void {
    if (this.browser) {
      localStorage.removeItem(this.tokenKey);
    }
    this.isAuthenticated.set(false);
    this.role.set(null);
  }

  getToken(): string | null {
    return this.browser ? localStorage.getItem(this.tokenKey) : null;
  }

  hasValidToken(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = this.decodeToken(token);
      const isValid = typeof payload.exp === 'number' && payload.exp * 1000 > Date.now();

      if (!isValid) {
        this.logout();
      } else {
        this.role.set(payload.role ?? null);
      }

      return isValid;
    } catch {
      this.logout();
      return false;
    }
  }

  isAdmin(): boolean {
    return this.role() === 'Admin';
  }

  private decodeToken(token: string): TokenPayload {
    const encodedPayload = token.split('.')[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    return JSON.parse(atob(encodedPayload)) as TokenPayload;
  }
}