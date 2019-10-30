import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Rezept} from '../../model/rezept';
import {AuthService} from '../../service/auth.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../container/confirmation-dialog/confirmation-dialog.component';
import {Observable} from 'rxjs/internal/Observable';
import {GlobalState} from '../../state/state';
import {Store} from '@ngrx/store';


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
  public userIsAuthenticated$: Observable<boolean>;
  public title = 'angular-confirmation-dialog';


  constructor(private authService: AuthService,
              public dialog: MatDialog,
              private store: Store<GlobalState>) {
  }

  ngOnInit() {
    this.userIsAuthenticated$ = this.store.select(state => state.auth.isAuthenticated);
  }

  ngOnDestroy() {
  }

  openRezept(rezeptId: string): void {
    this.open.emit(rezeptId);
  }

  deleteRezept(rezeptId: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '200px',
      data: 'Möchtest du das Rezept wirklich löschen ?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete.emit(rezeptId);
      }
    });
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

