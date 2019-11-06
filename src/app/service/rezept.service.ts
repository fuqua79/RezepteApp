import {Injectable} from '@angular/core';
import {createInitialRezept, Rezept} from '../model/rezept';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Subject} from 'rxjs/internal/Subject';
import {environment} from '../../environments/environment';
import {SuchParameter} from '../model/suchParameter';


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

  searchRezept(suchParameter: SuchParameter) {
    this.startLoading();
    console.log('--Rezept im Backend suchen--');
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
          this.stopLoading();
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
    const subject = new Subject();
    // Zuerst imageName holen
    this.getImageName(id).subscribe(imageName => {
      console.log('--Rezept mit id: ' + id + ' im Backend loeschen--');
      const url = this.REZEPTURL + '/delete/' + id;
      this.httpClient.delete(url).subscribe(response => {
        // Rezept gelöscht => jetzt noch Image löschen
        if (imageName !== '') {
          console.log('--Image mit name: ' + imageName + ' im Backend loeschen--');
          this.deleteImage(imageName).subscribe(result => {
            this.stopLoading();
            subject.next();
            subject.complete();
          });
        } else {
          this.stopLoading();
          subject.next();
          subject.complete();
        }
      });
    });
    return subject;
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
