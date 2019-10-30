import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {GlobalState} from '../../state/state';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {AuthState} from '../../state/auth/auth.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authState$: Observable<AuthState>;

  constructor(private authService: AuthService,
              private store: Store<GlobalState>) {
  }

  ngOnInit() {
      this.authState$ = this.store.select(state => state.auth);
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
  }
}
