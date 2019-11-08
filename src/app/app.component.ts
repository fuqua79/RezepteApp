import {Component, OnDestroy, OnInit} from '@angular/core';
import {RezeptService} from './service/rezept.service';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RezeptService]
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }
}

