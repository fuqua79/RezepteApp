import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {GlobalState} from '../../state/state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authState$ = this.store.select(state => state.auth);

  constructor(private authService: AuthService,
              private store: Store<GlobalState>) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
  }
}
