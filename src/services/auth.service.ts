// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private API_URL = 'http://localhost:3000/api/auth'; // Ajustar según tu backend

  // Guarda el usuario logueado
  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { username, password });
  }

  register(username: string, password: string, client_id: string): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, { username, password, client_id });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if(this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  setUser(userData: any) {
    this.currentUser = userData;
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getUser(): any {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('userData');
      console.log('Valor en localStorage (userData):', storedUser);
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
        console.log('Objeto parseado (currentUser):', this.currentUser);
      }
    }
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.currentUser = null;
  }
}
