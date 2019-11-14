import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import {GlobalState} from '../state/state';
import {clearAuthStateCreateUserFailure, clearAuthStateLogout, loginSuccessAutoLogin} from '../state/auth/auth.actions';
import {AuthState} from '../state/auth/auth.state';
import {startLoading, stopLoading} from '../state/loading/loading.actions';
import {catchError, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs/internal/observable/empty';
import {Credentials} from '../model/credentials';

@Injectable({providedIn: 'root'})
export class AuthService implements OnInit, OnDestroy {

  private tokenTimer: any;
  private URL = environment.apiUrl + '/user';

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<GlobalState>) {
  }

  ngOnInit(): void {
  }

  createUser(email: string, password: string) {
    this.store.dispatch(startLoading());
    const credentials: Credentials = {email: email, password: password};
    this.http.post(this.URL + '/signup', credentials).subscribe(() => {
      this.store.dispatch(stopLoading());
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.store.dispatch(clearAuthStateCreateUserFailure());
    });
  }

  login(email: string, password: string) {
    console.log('login aufrufen');
    this.store.dispatch(startLoading());
    const credentials: Credentials = {email: email, password: password};
    return this.http.post<{ token: string; expiresIn: number; userId: string }>(
      this.URL + '/login',
      credentials
    ).pipe(
      tap((response) => {
        console.log('LOGIN erfolgreich !');
        const token = response.token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          const expirationDate = new Date(new Date().getTime() + expiresInDuration * 1000);
          this.setAuthTimer(expiresInDuration);
          const authData = {
            userId: response.userId,
            userName: email,
            token: token,
            isAuthenticated: true,
            expirationDate: expirationDate
          };
          this.saveAuthData(authData);
          this.router.navigate(['/']);
        }
        this.store.dispatch(stopLoading());
      }),
      catchError((error) => {
        console.log('Login FAILURE: ', error);
        this.store.dispatch(stopLoading());
        return EMPTY;
      })
    )
  }

  logout() {
    this.store.dispatch(clearAuthStateLogout());
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }


  public autoAuthUser() {
    const authData = this.getAuthData();
    if (!authData.isAuthenticated) {
      return;
    }
    const now = new Date();
    const expiresIn = authData.expirationDate.getTime() - now.getTime();
    console.log('Authentication expires in: ' + expiresIn / 1000 / 60 + ' minutes.');
    if (expiresIn > 0) {
      this.setAuthTimer(expiresIn / 1000);
    }
    console.log('Auto Login successful!');
    this.store.dispatch(loginSuccessAutoLogin(authData));
  }


//////////////////////////////////////////////
  private getAuthData(): AuthState {
    return {
      userId: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
      isAuthenticated: (localStorage.getItem('isAuthenticated') === 'true'),
      expirationDate: new Date(localStorage.getItem('expiration')),
    };
  }

  private saveAuthData(authState: AuthState) {
    console.log('saveAuthState: ', authState);
    localStorage.setItem('token', authState.token);
    localStorage.setItem('expiration', authState.expirationDate.toISOString());
    localStorage.setItem('userId', authState.userId);
    localStorage.setItem('userName', authState.userName);
    localStorage.setItem('isAuthenticated', authState.isAuthenticated.toString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('isAuthenticated');
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  ngOnDestroy(): void {
  }

}
