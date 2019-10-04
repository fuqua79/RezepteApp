import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Rezept} from '../../model/rezept';
import {AuthService} from '../../service/auth.service';
import {Subscription} from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-rezept',
  templateUrl: './rezept-detail.component.html',
  styleUrls: ['./rezept-detail.component.css']
})
export class RezeptComponent implements OnInit, OnDestroy {

  @Input()
  public rezept: Rezept;

  @Input()
  isLoading: boolean;

  @Input()
  userId: string;

  @Output()
  delete = new EventEmitter<string>();

  @Output()
  open = new EventEmitter<string>();

  @Output()
  print = new EventEmitter<string>();

  public gewunschteAnzahlPersonen = 1;
  public userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  openRezept(rezeptId: string): void {
    this.open.emit(rezeptId);
  }

  deleteRezept(rezeptId: string) {
    this.delete.emit(rezeptId);
  }

  printRezept(rezeptId: string) {
    this.print.emit(rezeptId);
  }

  isCreatorLoggedInUser() {
    if (this.rezept) {
      return this.rezept.creator === this.userId;
    }
    return false;
  }
}

