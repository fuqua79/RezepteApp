import {Injectable} from '@angular/core';
import {createInitialRezept, Rezept} from '../model/rezept';
import {HttpClient, HttpParams} from '@angular/common/http';
import {concatMap, map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment';
import {SuchParameter} from '../model/suchParameter';
import {GlobalState} from '../state/state';
import {Store} from '@ngrx/store';
import {startLoading, stopLoading} from '../state/loading/loading.actions';


@Injectable()
export class RezeptService {

  private REZEPTURL = environment.apiUrl + '/rezept';
  private FILEURL = environment.apiUrl + '/files';

  constructor(private httpClient: HttpClient,
              private store: Store<GlobalState>) {
  }

  loadAllRezepte(): Observable<Rezept[]> {
    console.log('--Alle Rezepte vom Backend holen--');
    this.store.dispatch(startLoading());
    const url = this.REZEPTURL + '/list';
    return this.httpClient.get(url)
      .pipe(
        map((rezepteliste: any) => {
          for (const rezept of rezepteliste) {
            rezept.id = rezept._id;
          }
          this.store.dispatch(stopLoading());
          return rezepteliste;
        })
      );
  }

  loadRezept(id: string): Observable<Rezept> {
    console.log('--Rezept mit id: ' + id + ' vom Backend holen--');
    this.store.dispatch(startLoading());
    const url = this.REZEPTURL + '/' + id;
    return this.httpClient.get(url)
      .pipe(map((rezept: any) => {
          rezept.id = rezept._id;
          this.store.dispatch(stopLoading());
          return rezept;
        })
      );
  }

  loadRandomRezept(): Observable<Rezept> {
    console.log('--RandomRezept vom Backend holen--');
    this.store.dispatch(startLoading());
    const url = this.REZEPTURL + '/random';
    return this.httpClient.get(url)
      .pipe(map((rezept: any) => {
          if (rezept) {
            rezept.id = rezept._id;
          }
          this.store.dispatch(stopLoading());
          return rezept;
        })
      );
  }

  searchRezept(suchParameter: SuchParameter) {
    console.log('--Rezept im Backend suchen--');
    this.store.dispatch(startLoading());
    let params = new HttpParams();
    if (suchParameter.text) {
      params = params.set('text', suchParameter.text);
    }
    if (suchParameter.zeit) {
      params = params.set('zeit', suchParameter.zeit.toString());
    }
    if (suchParameter.art) {
      params = params.set('art', suchParameter.art);
    }
    const url = this.REZEPTURL + '/search';
    return this.httpClient.get(url, {params})
      .pipe(
        map((rezepteliste: any) => {
          for (const rezept of rezepteliste) {
            rezept.id = rezept._id;
          }
          this.store.dispatch(stopLoading());
          return rezepteliste;
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


  deleteRezept(id: string): Observable<Object> {
    return this.getImageName(id).pipe(
      concatMap((imageName) => {
        console.log('--Rezept mit id: ' + id + ' im Backend loeschen--');
        const url = this.REZEPTURL + '/delete/' + id;
        if (imageName !== '') {
          return this.httpClient.delete(url).pipe(
            concatMap(() => {
              if (imageName !== '') {
                console.log('--Image mit name: ' + imageName + ' im Backend loeschen--');
                return this.deleteImage(imageName);
              }
            })
          );
        } else {
          return this.httpClient.delete(url);
        }
      })
    );
  }

  loadOptionsArt(): Observable<string[]> {
    console.log('--Options für Art im Backend holen--');
    const url = this.REZEPTURL + '/options/art';
    return this.httpClient.get(url)
      .pipe(
        map((optionListe: any[]) => {
          const output = [];
          optionListe.forEach((item) => {
            output.push(item.art);
          });
          return output;
        })
      );
  }

////////////////////////////////////////////////////////////////////////////////////////////////
  private updateRezept(form: any): Observable<any> {
    console.log('--Bestehendes Rezet im Backend updaten-- id:', form.id);
    this.store.dispatch(startLoading());
    const urlRezept = this.REZEPTURL + '/' + form.id;
    if (this.checkNewImage(form)) {
      // Zuerst Image speichern und dann Rezept speichern => 2 Observables zusammenmappen
      return this.saveImage(form.image).pipe(
        concatMap((response) => {
          const rezept = this.mapFormToRezept(form, response);
          console.log('--CONCATMAP Neues Rezept im Backend updaten-- Rezept: ');
          return this.httpClient.put(urlRezept, rezept).pipe(
            tap(() => {
              this.store.dispatch(stopLoading());
            })
          );
        })
      );
    } else {
      const rezept = this.mapFormToRezept(form, null);
      console.log('--Neues Rezept im Backend updaten-- Rezept: ');
      return this.httpClient.put(urlRezept, rezept).pipe(
        tap(() => {
          this.store.dispatch(stopLoading());
        })
      );
    }
  }

  private insertRezept(form: any): Observable<any> {
    console.log('--Neues Form im Backend inserten-- FORM: ', form);
    this.store.dispatch(startLoading());
    const urlRezept = this.REZEPTURL + '/save';
    if (this.checkNewImage(form)) {
      // Zuerst Image speichern und dann Rezept speichern => 2 Observables zusammenmappen
      return this.saveImage(form.image).pipe(
        concatMap((response) => {
          const rezept = this.mapFormToRezept(form, response);
          console.log('--CONCATMAP Neues Rezept im Backend inserten-- Rezept: ');
          return this.httpClient.post(urlRezept, rezept).pipe(
            tap(() => {
              this.store.dispatch(stopLoading());
            })
          );
        })
      );
    } else {
      const rezept = this.mapFormToRezept(form, null);
      console.log('--Neues Rezept im Backend inserten-- Rezept: ');
      return this.httpClient.post(urlRezept, rezept).pipe(
        tap(() => {
          this.store.dispatch(stopLoading());
        })
      );
    }
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
    rezeptToSave.zeit = form.zeit;
    rezeptToSave.aktiveZeit = form.aktiveZeit;
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

  private deleteImage(imageName: string): Observable<any> {
    imageName = imageName.replace('https://rezepteappimages.s3.eu-central-1.amazonaws.com/', '');
    imageName = imageName.replace('https://rezepteappimages.s3.amazonaws.com/', '');
    imageName = decodeURIComponent(imageName);
    const urlFile = this.FILEURL + '/deletefrom3s';
    console.log('AWS S3 delete');
    const file = {'imageName': imageName};
    return this.httpClient.post(urlFile, file);
  }

  private getImageName(id: string): Observable<string> {
    console.log('--ImageName mit id: ' + id + ' vom Backend holen--');
    const url = this.REZEPTURL + '/' + id;
    return this.httpClient.get(url)
      .pipe(map((rezept: any) => {
          return rezept.imagePath;
        })
      );
  }
}
