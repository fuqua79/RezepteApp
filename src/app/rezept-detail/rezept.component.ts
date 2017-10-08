import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs/Subscription";
import {Rezept} from "../rezept/dto/rezept";
import {Zutat} from "../rezept/dto/zutat";
import {RezeptService} from "../rezept/rezept.service";


@Component({
  selector: 'app-rezept',
  templateUrl: './rezept.component.html',
  styleUrls: ['./rezept.component.css']
})
export class RezeptComponent implements OnInit {

  public rezept: Rezept;
  public gewunschteAnzahlPersonen: number = 1;

  routeSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rezeptService: RezeptService) {
    this.mylogger('RezeptComponent');
  }

  ngOnInit() {
    console.log('ngOnIniti');
    this.rezept = new Rezept();
    this.routeSubscription = this.route.params.subscribe(params => {
      let id = (params['id'] || '');
      this.rezeptService.loadRezept(id).subscribe( rezept => {
        this.rezept = rezept;
      });
      console.log('Rezept mit Id: ', id, ' holen')

    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  editRezept(id): void {
    console.log('Id= ', id);
    // const relUrl = this.router.url.includes()
    this.router.navigate(['/rezepteerfassen/' + id]);
  }

  mylogger(text: string): void {
    console.log(text);
  }

}
