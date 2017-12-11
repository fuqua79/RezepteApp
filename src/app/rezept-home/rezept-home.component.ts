import {Component, OnInit} from '@angular/core';
import {RezeptService} from '../rezept/rezept.service';
import {Rezept} from "../rezept/dto/rezept";
import {Router} from "@angular/router";


@Component({
  selector: 'app-rezept-home',
  templateUrl: './rezept-home.component.html',
  styleUrls: ['./rezept-home.component.css']
})
export class RezeptHomeComponent implements OnInit {

  public randomRezept: Rezept;

  constructor(private rezeptService: RezeptService,
              private router: Router) {
  }

  ngOnInit() {
    this.getRandomRezept();
  }

  getRandomRezept(): void {
    console.log("-- RandomRezept aus dem Backend holen --");

    this.rezeptService.loadRandomRezept().subscribe(rezept => {
      console.log('RandomRezept erfolgreich geholt');
      console.log("result= ", rezept);
      this.randomRezept = rezept;
    });
  }

  openRezept(id: string): void {
    console.log('Rezpet oeffnen mit id= ', id);
    this.router.navigate(['/rezept/' + id]);
  }

}
