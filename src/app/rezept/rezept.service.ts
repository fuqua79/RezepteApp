import {Injectable} from '@angular/core';
import {Rezept} from "./dto/rezept";
import {Zutat} from "./dto/zutat";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs";


@Injectable()
export class RezeptService {

  private rezeptUrl = '/api';

  constructor(private http: Http) {
  }

//http anschauen, wie ich optioins mitgeben kann ;-)

  updateRezept(putRezept: Rezept): Promise<void | Rezept> {
    var putUrl = this.rezeptUrl + '/' + putRezept.id;
    return this.http.put(putUrl, putRezept)
      .toPromise()
      .then(response => response.json() as Rezept)
      .catch(this.handleError);
  }

  // Get all posts from the API TESTS !!!!
  getAllPosts() {
    return this.http.get('/api/posts')
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getRezeptListe(): Promise<Rezept[]> {
    console.log('Rezepte im Backend holen.........!!!!');

    let rezeptListe: Array<Rezept>;

    let zutat1 = new Zutat();
    zutat1.einheit = 'ml';
    zutat1.menge = 100;
    zutat1.zutat = 'Milch';
    let zutat2 = new Zutat();
    zutat2.einheit = 'dl';
    zutat2.menge = 2;
    zutat2.zutat = 'Wasser';
    let zutaten = [zutat1, zutat2];

    let rezept2 = new Rezept();
    rezept2.id = 1;
    rezept2.beschreibung = 'Milchreis - Beschreibung';
    rezept2.zutaten = zutaten;
    rezept2.kalorien = 500;
    rezept2.schwierigkeitsgrad = 'einfach';
    rezept2.art = 'ART';
    rezept2.zubereitung = 'Zubereitung';

    let rezept3 = new Rezept();
    rezept3.id = 2;
    rezept3.beschreibung = 'Milchreis - Beschreibung';
    rezept3.zutaten = zutaten;
    rezept3.kalorien = 500;
    rezept3.schwierigkeitsgrad = 'einfach';
    rezept3.art = 'ART';
    rezept3.zubereitung = 'Zubereitung';

    let rezept4 = new Rezept();
    rezept4.id = 3;
    rezept4.beschreibung = 'Milchreis - Beschreibung';
    rezept4.zutaten = zutaten;
    rezept4.kalorien = 500;
    rezept4.schwierigkeitsgrad = 'einfach';
    rezept4.art = 'ART';
    rezept4.zubereitung = 'Zubereitung';

    let rezept5 = new Rezept();
    rezept5.id = 4;
    rezept5.beschreibung = 'Milchreis - Beschreibung';
    rezept5.zutaten = zutaten;
    rezept5.kalorien = 500;
    rezept5.schwierigkeitsgrad = 'einfach';
    rezept5.art = 'ART';
    rezept5.zubereitung = 'Zubereitung';

    let rezept6 = new Rezept();
    rezept6.id = 5;
    rezept6.beschreibung = 'Milchreis - Beschreibung';
    rezept6.zutaten = zutaten;
    rezept6.kalorien = 500;
    rezept6.schwierigkeitsgrad = 'einfach';
    rezept6.art = 'ART';
    rezept6.zubereitung = 'Zubereitung';

    rezeptListe = [rezept2, rezept3, rezept4, rezept5, rezept6];

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('WARTEN.........');
        resolve(rezeptListe);
      }, 1000);
    });
    return promise;
  }


  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }


}
