import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthService} from '../../service/auth.service';
import {selectLoading} from '../../state/loading/loading.selectors';
import {GlobalState} from '../../state/state';
import {Store} from '@ngrx/store';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public isLoading$ = this.store.select(selectLoading);

  constructor(private authService: AuthService,
              private store: Store<GlobalState>) {
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.email, form.value.password);
  }
}
