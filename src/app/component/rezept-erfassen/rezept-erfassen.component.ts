import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Rezept} from '../../model/rezept';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Zutat} from '../../model/zutat';
import {Observable} from 'rxjs/internal/Observable';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-rezept-erfassen',
  templateUrl: './rezept-erfassen.component.html',
  styleUrls: ['./rezept-erfassen.component.css']
})
export class RezeptErfassenComponent implements OnInit, OnChanges {

  @Input()
  rezeptInput: Rezept;

  @Input()
  optionsArt: string[];

  @Output()
  save = new EventEmitter<any>();

  public formGroup: FormGroup;
  public zutatenListe: FormArray;
  public imagePreview: string;
  public filteredOptions: Observable<string[]>;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group(
      {
        'id': [null],
        'beschreibung': ['', [Validators.required, Validators.minLength(3)]],
        'titel': ['', [Validators.required, Validators.minLength(3)]],
        'art': [''],
        'zeit': [''],
        'aktiveZeit': [''],
        'zubereitung': [''],
        'anzahlPersonen': [1, Validators.required],
        'zutaten': this.formBuilder.array([]),
        'kalorien': [''],
        'fett': [''],
        'eiweiss': [''],
        'kohlenhydrate': [''],
        'image': ['']
      }
    );
    this.zutatenListe = this.formGroup.get('zutaten') as FormArray;
    this.filteredOptions = this.formGroup.get('art').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.formGroup && this.rezeptInput) {
      this.formGroup.patchValue({
        'id': this.rezeptInput.id,
        'titel': this.rezeptInput.titel,
        'beschreibung': this.rezeptInput.beschreibung,
        'art': this.rezeptInput.art,
        'zeit': this.rezeptInput.zeit,
        'aktiveZeit': this.rezeptInput.aktiveZeit,
        'zubereitung': this.rezeptInput.zubereitung,
        'anzahlPersonen': this.rezeptInput.anzahlPersonen,
        'kalorien': this.rezeptInput.naehrwerte.kalorien,
        'fett': this.rezeptInput.naehrwerte.fett,
        'eiweiss': this.rezeptInput.naehrwerte.eiweiss,
        'kohlenhydrate': this.rezeptInput.naehrwerte.kohlenhydrate,
        'image': this.rezeptInput.imagePath
      });
      this.patchZutaten(this.rezeptInput.zutaten);
      this.imagePreview = this.rezeptInput.imagePath;
    }
  }


  get zutatenFormGroup() {
    return this.formGroup.get('zutaten') as FormArray;
  }

  private createZutat(menge: number, einheit: string, zutat: string): FormGroup {
    return this.formBuilder.group({
      'menge': [menge],
      'einheit': [einheit],
      'zutat': [zutat]
    });
  }

  public addEmptyZutat(): void {
    this.zutatenListe.push(this.createZutat(0, '', ''));
  }

  private addZutat(menge: number, einheit: string, zutat: string): void {
    this.zutatenListe.push(this.createZutat(menge, einheit, zutat));
  }

  private removeZutat(arrayIndex: number): void {
    this.zutatenListe.removeAt(arrayIndex);
  }

  private patchZutaten(zutaten: Array<Zutat>) {
    zutaten.forEach(item => {
      this.addZutat(item.menge, item.einheit, item.zutat);
    });
  }

  private _filter(value: string): string[] {
    if (this.optionsArt) {
      const filterValue = value.toLowerCase();
      return this.optionsArt.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  saveRezept(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.save.emit(this.formGroup.value);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.formGroup.patchValue({image: file});
    this.formGroup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

  clearArt() {
    this.formGroup.patchValue({'art': ''});
  }
}

