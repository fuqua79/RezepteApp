import {Injectable} from '@angular/core';
import {Rezept} from '../model/rezept';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';


@Injectable()
export class RezeptService {

  private rezeptUrl = '/api/rezept';
  private dirImages = '../../assets/images/';

  constructor(private httpClient: HttpClient) {
  }

  loadAllRezepte(): Observable<Rezept[]> {
    console.log('--Alle Rezepte vom Backend holen--');
    const url = this.rezeptUrl + '/list';
    return this.httpClient.get(url)
      .pipe(
        map((rezepteliste: any) => {
          console.log('CLient: Rezeptliste= ', rezepteliste);
          for (const rezept of rezepteliste) {
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
          rezept.id = rezept._id;
          console.log('MIKE Rezept: ', rezept);
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
          console.log('randomRezept: ' + rezept.id);
          return rezept;
        })
        // ,catchError(this.handleError)
      );
  }

  saveRezept(rezept: Rezept): Observable<Object> {
    console.log('--Neues Rezept im Backend speichern-- REZEPT: ', rezept);
    const url = this.rezeptUrl + '/save';
    return this.httpClient.post(url, rezept);
  }

  deleteRezept(id: string): Observable<Object> {
    console.log('--Rezept mit id: ' + id + ' im Backend loeschen--');
    const url = this.rezeptUrl + '/delete/' + id;
    return this.httpClient.delete(url);
  }
}
