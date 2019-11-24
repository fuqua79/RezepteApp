import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Rezept} from '../../model/rezept';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {createInitialZutat, Zutat} from '../../model/zutat';
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

  @Input()
  isLoading: { isLoading: boolean };

  @Output()
  save = new EventEmitter<any>();

  public formGroup: FormGroup;
  public zutatenListe: FormArray;
  public imagePreview: string;
  public filteredOptions$: Observable<string[]>;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        'id': [null],
        'titel': ['', [Validators.required, Validators.minLength(3)]],
        'beschreibung': [''],
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
    this.filteredOptions$ = this.formGroup.get('art').valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterOptionsArt(value))
      );
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rezeptInput && this.formGroup && this.rezeptInput) {
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

  private createZutat(zutat: Zutat): FormGroup {
    return this.formBuilder.group({
      'menge': [zutat.menge, Validators.required],
      'einheit': [zutat.einheit],
      'zutat': [zutat.zutat, Validators.required]
    });
  }

  public addEmptyZutat(): void {
    this.zutatenListe.insert(0, this.createZutat(createInitialZutat()));
  }

  private addZutat(zutat: Zutat): void {
    this.zutatenListe.push(this.createZutat(zutat));
  }

  private removeZutat(arrayIndex: number): void {
    this.zutatenListe.removeAt(arrayIndex);
  }

  private patchZutaten(zutaten: Array<Zutat>) {
    zutaten.forEach(zutat => {
      this.addZutat(zutat);
    });
  }

  private filterOptionsArt(value: string): string[] {
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

  clearZeit() {
    this.formGroup.patchValue({'zeit': ''});
  }

  clearAktiveZeit() {
    this.formGroup.patchValue({'aktiveZeit': ''});
  }

  clearKalorien() {
    this.formGroup.patchValue({'kalorien': ''});
  }

  clearFett() {
    this.formGroup.patchValue({'fett': ''});
  }

  clearEiweiss() {
    this.formGroup.patchValue({'eiweiss': ''});
  }

  clearKohlenhydrate() {
    this.formGroup.patchValue({'kohlenhydrate': ''});
  }
}
