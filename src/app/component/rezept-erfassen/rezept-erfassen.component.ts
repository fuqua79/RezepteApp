import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Rezept} from '../../model/rezept';
import * as model from '../../model/model-interfaces';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Zutat} from '../../model/zutat';


@Component({
  selector: 'app-rezept-erfassen',
  templateUrl: './rezept-erfassen.component.html',
  styleUrls: ['./rezept-erfassen.component.css']
})
export class RezeptErfassenComponent implements OnInit, OnChanges {

  @Input()
  rezeptInput: Rezept;

  @Output()
  save = new EventEmitter<any>();

  public model = model;
  public formGroup: FormGroup;
  public zutatenListe: FormArray;
  public imagePreview: string;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    console.log('ngInit: formGroup erstellen');
    if (this.rezeptInput) {
      console.log('Rezept schon da !');
    } else {
      console.log('Rezept Nicht da..');
    }

    this.formGroup = this.formBuilder.group(
      {
        'id': [null],
        'beschreibung': ['', [Validators.required, Validators.minLength(3)]],
        'titel': ['', [Validators.required, Validators.minLength(3)]],
        'schwierigkeitsgrad': [''],
        'art': [''],
        'zeit': [''],
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
    console.log('ngInit fertig...');
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('input changed');
    console.log('rezeptInput: ' + this.rezeptInput);
    if (this.rezeptInput) {
      console.log('rezeptInput: ' + this.rezeptInput.titel);
    }
    if (this.formGroup && this.rezeptInput) {
      this.formGroup.patchValue({
        'id': this.rezeptInput.id,
        'titel': this.rezeptInput.titel,
        'beschreibung': this.rezeptInput.beschreibung,
        'schwierigkeitsgrad': this.rezeptInput.schwierigkeitsgrad,
        'art': this.rezeptInput.art,
        'zeit': this.rezeptInput.zeit,
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

  private addEmptyZutat(): void {
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


}

