import {Injectable} from '@angular/core';
import {Rezept} from "./dto/rezept";
import {Zutat} from "./dto/zutat";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs";


@Injectable()
export class RezeptService {

  private rezeptUrl = '/api/rezept';

  constructor(private http: Http) {
  }

//http anschauen, wie ich optioins mitgeben kann ;-)

  loadAllRezepte() : Observable<Rezept[]> {
    console.log("--Alle Rezepte vom Backend holen--");

    let url = this.rezeptUrl + '/list';
    return this.http.get(url)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(this.handleError(error)|| 'Server error'));
  }

  loadRezept(id) : Observable<Rezept> {
    console.log('--Rezept mit id: ' +id +' vom Backend holen--');

    let url = this.rezeptUrl + '/' +id;
    return this.http.get(url)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(this.handleError(error)|| 'Server error'));
  }

  saveRezept(rezept: Rezept) : Observable<void> {
    console.log('--Neues Rezept im Backend speichern--');

    let url = this.rezeptUrl + '/save';
    return this.http.post(url, rezept)
    //TODO: Hier funktioniert das JSON Konvertieren nicht, da hier die index.html kommt !
      .map(res => res)
      .catch((error: any) => Observable.throw(this.handleError(error)|| 'Server error'));
  }

////////////////////////////////////////////////////////



  updateRezept(putRezept: Rezept): Promise<void | Rezept> {
    var putUrl = this.rezeptUrl + '/' + putRezept._id;
    return this.http.put(putUrl, putRezept)
      .toPromise()
      .then(response => response.json() as Rezept)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }


}
