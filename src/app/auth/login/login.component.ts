import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthService} from '../../service/auth.service';
import {GlobalState} from '../../state/state';
import {Store} from '@ngrx/store';
import {selectLoading} from '../../state/loading/loading.selectors';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public isLoading$ = this.store.select(selectLoading);

  constructor(private authService: AuthService,
              private store: Store<GlobalState>) {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }
}
