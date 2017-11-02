import {Injectable} from '@angular/core';
import {Rezept} from "./dto/rezept";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs";


@Injectable()
export class RezeptService {

  private rezeptUrl = '/api/rezept';

  constructor(private http: Http) {
  }

//http anschauen, wie ich options mitgeben kann ;-)

  loadAllRezepte(): Observable<Rezept[]> {
    console.log("--Alle Rezepte vom Backend holen--");
//TODO: Image-Directory hier noch reinbekommen und nicht erst in den einzelnen Components !!!
    let url = this.rezeptUrl + '/list';
    return this.http.get(url)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(this.handleError(error) || 'Server error'));
  }

  loadRezept(id: string): Observable<Rezept> {
    console.log('--Rezept mit id: ' + id + ' vom Backend holen--');
//TODO: Image-Directory hier noch reinbekommen und nicht erst in den einzelnen Components !!!
    let url = this.rezeptUrl + '/' + id;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(this.handleError(error) || 'Server error'));
  }

  loadRandomRezept(): Observable<Rezept> {
    console.log('--RandomRezept vom Backend holen--');
//TODO: Image-Directory hier noch reinbekommen und nicht erst in den einzelnen Components !!!
//TODO: url noch ändern !!!!
    let url = this.rezeptUrl + '/random';
    return this.http.get(url)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(this.handleError(error) || 'Server error'));
  }


  saveRezept(rezept: Rezept): Observable<void> {
    console.log('--Neues Rezept im Backend speichern--');

    let url = this.rezeptUrl + '/save';
    return this.http.post(url, rezept)
      .map(res => res)
      //TODO: Hier funktioniert das JSON Konvertieren nicht, da hier die index.html kommt !
      .catch((error: any) => Observable.throw(this.handleError(error) || 'Server error'));
  }

  deleteRezept(id: string): Observable<void> {
    console.log('--Rezept mit id: ' + id + ' im Backend loeschen--');

    let url = this.rezeptUrl + '/delete/' + id;
    return this.http.delete(url)
      .map(res => res)
      //TODO: Hier funktioniert das JSON Konvertieren nicht, da hier die index.html kommt !
      .catch((error: any) => Observable.throw(this.handleError(error) || 'Server error'));
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
