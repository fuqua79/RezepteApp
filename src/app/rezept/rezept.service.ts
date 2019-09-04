import {Injectable} from '@angular/core';
import {Rezept} from './dto/rezept';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {of} from 'rxjs/internal/observable/of';


@Injectable()
export class RezeptService {

  private rezeptUrl = '/api/rezept';
  private dirImages = '../../assets/images/';
  private testRezept: any;

  constructor(private httpClient: HttpClient) {
  }

/*
  loadTest(): Observable<Rezept> {
    console.log('--Test vom Backend holen--');
    const url = '/api/test';
  22  this.httpClient.get<{message: string, rezept: any}>(url)
      .subscribe((response) => {
        this.testRezept = response.rezept;

      });
  }
*/



  loadAllRezepte(): Observable<Rezept[]> {
    console.log('--Alle Rezepte vom Backend holen--');
    const url = this.rezeptUrl + '/list';
    return this.httpClient.get(url)
      .pipe(
        map((rezepteliste: any) => {
          console.log('CLient: Rezeptliste= ', rezepteliste);
          for (const rezept of rezepteliste) {
            rezept.imageFilename = this.dirImages + rezept.imageFilename;
            rezept.id = rezept._id;
          }
          return rezepteliste;
        })
        // ,catchError(this.handleError)
      );
  }

  loadRezept(id: string): Observable<Rezept> {
    console.log('--Rezept mit id: ' + id + ' vom Backend holen--');
    const url = this.rezeptUrl + '/' + id;
    return this.httpClient.get(url)
      .pipe(map((rezept: any) => {
          rezept.imageFilename = this.dirImages + rezept.imageFilename;
          rezept.id = rezept._id;
          console.log('MIKE Rezept: ', rezept)
          return rezept;
        })
        // ,catchError(this.handleError)
      );
  }

  loadRandomRezept(): Observable<Rezept> {
    console.log('--RandomRezept vom Backend holen--');
    const url = this.rezeptUrl + '/random';
    return this.httpClient.get(url)
      .pipe(map((rezept: any) => {
          rezept.imageFilename = this.dirImages + rezept.imageFilename;
          rezept.id = rezept._id;
          return rezept;
        })
        // ,catchError(this.handleError)
      );
  }

  saveRezept(rezept: Rezept): Observable<Object> {
    console.log('--Neues Rezept im Backend speichern--');
    console.log('--Neues Rezept im Backend speichern-- REZEPT: ', rezept);
    const url = this.rezeptUrl + '/save';
    return this.httpClient.post(url, rezept)
      .pipe(map((rez: any) => {
          rez.id = rez._id;
          return rez;
        })
      );
  }

  deleteRezept(id: string): Observable<Object> {
    console.log('--Rezept mit id: ' + id + ' im Backend loeschen--');

    const url = this.rezeptUrl + '/delete/' + id;
    return this.httpClient.delete(url)
      .pipe(map(res => res)
        // TODO: Hier funktioniert das JSON Konvertieren nicht, da hier die index.html kommt !
        // ,catchError(this.handleError)
      );
  }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {
      const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

      // TODO: send the error to remote logging infrastructure
      console.error(errMsg); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
