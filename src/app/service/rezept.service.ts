import {Injectable} from '@angular/core';
import {Rezept} from '../model/rezept';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';


@Injectable()
export class RezeptService {

  public isLoading$ = new BehaviorSubject<boolean>(false);

  private rezeptUrl = '/api/rezept';
  private dirImages = '../../assets/images/';

  constructor(private httpClient: HttpClient) {
  }

  loadAllRezepte(): Observable<Rezept[]> {
    this.startLoading();
    console.log('--Alle Rezepte vom Backend holen--');
    const url = this.rezeptUrl + '/list';
    return this.httpClient.get(url)
      .pipe(
        map((rezepteliste: any) => {
          console.log('CLient: Rezeptliste= ', rezepteliste);
          for (const rezept of rezepteliste) {
            rezept.id = rezept._id;
          }
          this.stopLoading();
          return rezepteliste;
        })
        // ,catchError(this.handleError)
      );
  }

  loadRezept(id: string): Observable<Rezept> {
    this.startLoading();
    console.log('--Rezept mit id: ' + id + ' vom Backend holen--');
    const url = this.rezeptUrl + '/' + id;
    return this.httpClient.get(url)
      .pipe(map((rezept: any) => {
          rezept.id = rezept._id;
          console.log('MIKE Rezept: ', rezept);
          this.stopLoading();
          return rezept;
        })
        // ,catchError(this.handleError)
      );
  }

  loadRandomRezept(): Observable<Rezept> {
    this.startLoading();
    console.log('--RandomRezept vom Backend holen--');
    const url = this.rezeptUrl + '/random';
    return this.httpClient.get(url)
      .pipe(map((rezept: any) => {
          rezept.imageFilename = this.dirImages + rezept.imageFilename;
          rezept.id = rezept._id;
          console.log('randomRezept: ' + rezept.id);
          this.stopLoading();
          return rezept;
        })
      );
  }

  saveRezept(rezept: Rezept): Observable<Object> {
    this.startLoading();
    console.log('--Neues Rezept im Backend speichern-- REZEPT: ', rezept);
    const url = this.rezeptUrl + '/save';
    this.stopLoading();
    return this.httpClient.post(url, rezept);
  }

  deleteRezept(id: string): Observable<Object> {
    this.startLoading();
    console.log('--Rezept mit id: ' + id + ' im Backend loeschen--');
    const url = this.rezeptUrl + '/delete/' + id;
    this.stopLoading();
    return this.httpClient.delete(url);
  }

  private startLoading(): void {
    this.isLoading$.next(true);
  }
  private stopLoading(): void {
    this.isLoading$.next(false);
  }
}
