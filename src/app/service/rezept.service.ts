import {Injectable} from '@angular/core';
import {createInitialRezept, Rezept} from '../model/rezept';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Subject} from 'rxjs/internal/Subject';


@Injectable()
export class RezeptService {

  public isLoading$ = new BehaviorSubject<boolean>(false);

  private rezeptUrl = 'http://localhost:3000/api/rezept';

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
          rezept.id = rezept._id;
          console.log('randomRezept: ' + rezept.id);
          this.stopLoading();
          return rezept;
        })
      );
  }

  saveRezept(form: any): Observable<any> {
    console.log('--Neues Form im Backend speichern-- FORM: ', form);
    if (form.image) {
      const subject = new Subject();
      const imageData = new FormData();
      imageData.append('image', form.image);
      const urlFile = this.rezeptUrl + '/file/save';
      console.log('--Neues File im Backend speichern-- FILE');
      this.httpClient.post(urlFile, imageData).subscribe((response) => {
        const urlRezept = this.rezeptUrl + '/save';
        const rezept = this.mapFormToRezept(form, response);
        console.log('--Neues Rezept im Backend speichern-- Rezept: ');
        this.httpClient.post(urlRezept, rezept).subscribe(() => {
          subject.next();
          subject.complete();
        });
      });
      return subject;
    } else {
      const urlRezept = this.rezeptUrl + '/save';
      const rezept = this.mapFormToRezept(form, null);
      console.log('--Neues Rezept im Backend speichern-- Rezept: ');
      return this.httpClient.post(urlRezept, rezept);
    }
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

  private mapFormToRezept(form: any, response: any): Rezept {
    const rezeptToSave = createInitialRezept();
    rezeptToSave.beschreibung = form.beschreibung;
    rezeptToSave.titel = form.titel;
    rezeptToSave.anzahlPersonen = form.anzahlPersonen;
    rezeptToSave.zutaten = form.zutaten;
    rezeptToSave.schwierigkeitsgrad = form.schwierigkeitsgrad;
    rezeptToSave.zeit = form.zeit;
    rezeptToSave.zubereitung = form.zubereitung;
    rezeptToSave.art = form.art;
    rezeptToSave.naehrwerte.kalorien = form.kalorien;
    rezeptToSave.naehrwerte.fett = form.fett;
    rezeptToSave.naehrwerte.eiweiss = form.eiweiss;
    rezeptToSave.naehrwerte.kohlenhydrate = form.kohlenhydrate;
    if (response !== null && response.imagePath !== '') {
      rezeptToSave.imagePath = response.imagePath;
    }

    return rezeptToSave;
  }
}
