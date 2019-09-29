import {Component, OnInit} from '@angular/core';
import {Rezept} from '../../model/rezept';
import {RezeptService} from '../../service/rezept.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-rezept-home-container',
  templateUrl: './rezept-home-container.component.html',
  styleUrls: ['./rezept-home-container.component.css']
})
export class RezeptHomeContainerComponent implements OnInit {

  public isLoading$: BehaviorSubject<boolean>;
  public randomRezept$: Observable<Rezept>;

  constructor(private rezeptService: RezeptService,
              private router: Router) {
  }

  ngOnInit() {
    this.isLoading$ = this.rezeptService.isLoading$;
    this.getRandomRezept();
  }

  getRandomRezept(): void {
    this.randomRezept$ = this.rezeptService.loadRandomRezept();
  }

  openRezept(id: string): void {
    this.router.navigate(['/rezept/' + id]);
  }
}
