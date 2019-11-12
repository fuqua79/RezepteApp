import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {AuthData} from '../auth/auth-data.model';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import {GlobalState} from '../state/state';
import {clearAuthState, loginSuccess} from '../state/auth/auth.actions';
import {Subscription} from 'rxjs/internal/Subscription';
import {AuthState, initialAuthState} from '../state/auth/auth.state';

@Injectable({providedIn: 'root'})
export class AuthService implements OnInit, OnDestroy {
  private tokenTimer: any;
  private URL = environment.apiUrl + '/user';
  private storeSubs: Subscription;

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<GlobalState>) {
  }

  ngOnInit(): void {
    let authInformation = initialAuthState;
    this.storeSubs = this.store.subscribe(state => {
      authInformation = state.auth;
      this.saveAuthData(state.auth);
    });
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post(this.URL + '/signup', authData).subscribe(() => {
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.store.dispatch(clearAuthState());
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http
      .post<{ token: string; expiresIn: number; userId: string }>(
        this.URL + '/login',
        authData
      )
      .subscribe(response => {
        const token = response.token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          const expirationDate = new Date(new Date().getTime() + expiresInDuration * 1000);
          this.setAuthTimer(expiresInDuration);
          console.log('loginsuccess Action ausführen.', expirationDate);
          this.store.dispatch(loginSuccess({
            userId: response.userId,
            userName: email,
            token: token,
            isAuthenticated: true,
            expirationDate: expirationDate
          }));
          this.saveAuthData({
            userId: response.userId,
            userName: email,
            token: token,
            isAuthenticated: true,
            expirationDate: expirationDate
          });
          console.log(expirationDate);
          this.router.navigate(['/']);
        }
      }, error => {
        console.log(error);
        this.store.dispatch(clearAuthState());
      });
  }

  logout() {
    this.store.dispatch(clearAuthState());
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    // TODO nach F5 ist alles weg weil nicht im localstorage gespeichert
    const authData = this.getAuthData();
    console.log('authDatta', authData);

    /*
    let authInformation = initialAuthState;
    this.storeSubs = this.store.subscribe(state => {
      authInformation = state.auth;
    });
    if (!authInformation.isAuthenticated) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.setAuthTimer(expiresIn / 1000);
    }

     */

  }

  // TODO eliminieren
  private saveAuthData(authState: AuthState) {
    localStorage.setItem('token', authState.token);
    localStorage.setItem('expiration', authState.expirationDate.toISOString());
    localStorage.setItem('userId', authState.userId);
    localStorage.setItem('userName', authState.userName);
    localStorage.setItem('isAuthenticated', authState.isAuthenticated.toString());
  }

  /// TODO eliminieren
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAuthenticated');
  }

  /// TODO eliminieren
  private getAuthData(): AuthState {
    const authState: AuthState = {
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
      isAuthenticated: (localStorage.getItem('isAuthenticated') === 'true'),
      expirationDate: new Date(localStorage.getItem('expiration')),
    };
    return authState;
    /*
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
     */
  }

  ngOnDestroy(): void {
    this.storeSubs.unsubscribe();
  }

}
