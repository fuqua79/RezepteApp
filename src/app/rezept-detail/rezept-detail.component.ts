import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {Rezept} from "../rezept/dto/rezept";
import {RezeptService} from "../rezept/rezept.service";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-rezept',
  templateUrl: './rezept-detail.component.html',
  styleUrls: ['./rezept-detail.component.css']
})
export class RezeptComponent implements OnInit {

  public rezept$: Observable<Rezept>;
  public gewunschteAnzahlPersonen: number = 1;

  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rezeptService: RezeptService) {
    this.mylogger('RezeptComponent');
  }

  ngOnInit() {
    console.log('ngOnIniti');
    this.routeSubscription = this.route.params.subscribe(params => {
      let id = (params['id'] || '');
      this.rezept$ = this.rezeptService.loadRezept(id);
      console.log('Rezept mit Id: ', id, ' holen')
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  editRezept(rezept$: Observable<Rezept>): void {
    rezept$.subscribe( (rezept) => {
      console.log('Id= ', rezept._id);
      this.router.navigate(['/rezepteerfassen/' + rezept._id]);
    });
  }

  deleteRezept(rezept$: Observable<Rezept>) {
    rezept$.subscribe( (rezept) => {
      console.log("Rezept loeschen mit Id= ", rezept._id);
      this.rezeptService.deleteRezept(rezept._id).subscribe(() => {
        console.log("Rezept erfolgreich geloescht");
      });
    });
  }

  mylogger(text: string): void {
    console.log(text);
  }

  incrementAnzahlPersonen() {
    this.gewunschteAnzahlPersonen = 12;
  }

}
