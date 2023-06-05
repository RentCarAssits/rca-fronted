import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base/base.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {catchError, Observable, retry} from "rxjs";
import {AuthenticationResponse} from "../models/authentication-response";

const TOKEN_KEY = 'accessToken';
const CURRENT_USER_KEY = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends  BaseService{

// Authentication Service

  constructor(http: HttpClient) {
    super(http);
    this.basePath += '/auth';
  }

  // Sign-Up
  signUp(user: User): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.basePath}/register`, user, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Sign-In
  signIn(user: User): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.basePath}/login`, user, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get Token
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  // Set Token
  setToken(accessToken: string) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  }

  // Set Current User
  setCurrentUser(currentUser: AuthenticationResponse) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  }

  // Get Current User
  getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) as User : null;
  }

  // Check if signed in
  get isSignedIn(): boolean {
    return this.getToken() != null;
  }

  // Sign Out

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  }

}
