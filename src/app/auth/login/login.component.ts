import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthService} from '../../service/auth.service';
import {GlobalState} from '../../state/state';
import {Store} from '@ngrx/store';
import {selectLoading} from '../../state/loading/loading.selectors';
import {login} from '../../state/auth/auth.actions';
import {Credentials} from '../../model/credentials';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public isLoading$ = this.store.select(selectLoading);

  constructor(private authService: AuthService,
              private store: Store<GlobalState>) {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const credentials: Credentials = {
      email: form.value.email,
      password: form.value.password
    };
    this.store.dispatch(login({credentials}));
  }
}
