import {Injectable} from '@angular/core';
import {createInitialRezept, Rezept} from '../model/rezept';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Subject} from 'rxjs/internal/Subject';
import {environment} from '../../environments/environment';


@Injectable()
export class RezeptService {

  public isLoading$ = new BehaviorSubject<boolean>(false);

  private REZEPTURL = environment.apiUrl + '/rezept';
  private FILEURL = environment.apiUrl + '/files';

  constructor(private httpClient: HttpClient) {
  }

  loadAllRezepte(): Observable<Rezept[]> {
    this.startLoading();
    console.log('--Alle Rezepte vom Backend holen--');
    const url = this.REZEPTURL + '/list';
    return this.httpClient.get(url)
      .pipe(
        map((rezepteliste: any) => {
          for (const rezept of rezepteliste) {
            rezept.id = rezept._id;
          }
          this.stopLoading();
          return rezepteliste;
        })
      );
  }

  loadRezept(id: string): Observable<Rezept> {
    this.startLoading();
    console.log('--Rezept mit id: ' + id + ' vom Backend holen--');
    const url = this.REZEPTURL + '/' + id;
    return this.httpClient.get(url)
      .pipe(map((rezept: any) => {
          rezept.id = rezept._id;
          this.stopLoading();
          return rezept;
        })
      );
  }

  loadRandomRezept(): Observable<Rezept> {
    this.startLoading();
    console.log('--RandomRezept vom Backend holen--');
    const url = this.REZEPTURL + '/random';
    return this.httpClient.get(url)
      .pipe(map((rezept: any) => {
          if (rezept) {
            rezept.id = rezept._id;
          }
          this.stopLoading();
          return rezept;
        })
      );
  }

  saveRezept(form: any): Observable<any> {
    if (form.id && form.id !== '') {
      console.log('rezept.service: Update Rezept...');
      return this.updateRezept(form);
    } else {
      console.log('rezept.service: Insert Rezept...');
      return this.insertRezept(form);
    }
  }

  updateRezept(form: any): Observable<any> {
    console.log('--Bestehendes Rezet im Backend updaten-- id:', form.id);
    if (this.checkNewImage(form)) {
      const subject = new Subject();
      this.saveImage(form.image).subscribe((response) => {
        const urlRezept = this.REZEPTURL + '/' + form.id;
        const rezept = this.mapFormToRezept(form, response);
        console.log('--Neues Rezept im Backend updaten-- Rezept: ');
        this.httpClient.put(urlRezept, rezept).subscribe(() => {
          subject.next();
          subject.complete();
        });
      });
      return subject;
    } else {
      const urlRezept = this.REZEPTURL + '/' + form.id;
      const rezept = this.mapFormToRezept(form, null);
      console.log('--Neues Rezept im Backend updaten-- Rezept: ');
      return this.httpClient.put(urlRezept, rezept);
    }
  }

  insertRezept(form: any): Observable<any> {
    console.log('--Neues Form im Backend inserten-- FORM: ', form);
    if (this.checkNewImage(form)) {
      const subject = new Subject();
      this.saveImage(form.image).subscribe((response) => {
        const urlRezept = this.REZEPTURL + '/save';
        const rezept = this.mapFormToRezept(form, response);
        console.log('--Neues Rezept im Backend inserten-- Rezept: ');
        this.httpClient.post(urlRezept, rezept).subscribe(() => {
          subject.next();
          subject.complete();
        });
      });
      return subject;
    } else {
      const urlRezept = this.REZEPTURL + '/save';
      const rezept = this.mapFormToRezept(form, null);
      console.log('--Neues Rezept im Backend inserten-- Rezept: ');
      return this.httpClient.post(urlRezept, rezept);
    }
  }

  deleteRezept(id: string): Observable<Object> {
    this.startLoading();
    console.log('--Rezept mit id: ' + id + ' im Backend loeschen--');
    const url = this.REZEPTURL + '/delete/' + id;
    this.stopLoading();
    return this.httpClient.delete(url);
  }


////////////////////////////////////////////////////////////////////////////////////////////////
  private startLoading(): void {
    this.isLoading$.next(true);
  }

  private stopLoading(): void {
    this.isLoading$.next(false);
  }

  private checkNewImage(form: any): boolean {
    return form && form.image && typeof form.image === 'object';
  }

  private mapFormToRezept(form: any, response: any): Rezept {
    const rezeptToSave = createInitialRezept();
    rezeptToSave.id = form.id;
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
    } else if (typeof form.image === 'string') {
      rezeptToSave.imagePath = form.image;
    }

    return rezeptToSave;
  }

  private saveImage(image: any): Observable<any> {
    const imageData = new FormData();
    imageData.append('image', image);
    const urlFile = this.FILEURL + '/saveto3s';
    console.log('AWS S3 speichern');
    return this.httpClient.post(urlFile, imageData);
  }

}
