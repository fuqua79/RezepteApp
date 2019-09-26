import {Component, OnInit} from '@angular/core';
import {Rezept} from '../../model/rezept';
import {RezeptService} from '../../service/rezept.service';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-rezept-home-container',
  templateUrl: './rezept-home-container.component.html',
  styleUrls: ['./rezept-home-container.component.css']
})
export class RezeptHomeContainerComponent implements OnInit {

  private randomRezept$: Observable<Rezept>;

  constructor(private rezeptService: RezeptService,
              private router: Router) {
  }

  ngOnInit() {
    this.getRandomRezept();
  }

  getRandomRezept(): void {
    console.log('neues reept holen...');
    this.randomRezept$ = this.rezeptService.loadRandomRezept();
  }

  openRezept(id: string): void {
    this.router.navigate(['/rezept/' + id]);
  }
}
