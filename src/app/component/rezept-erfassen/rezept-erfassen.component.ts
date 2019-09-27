import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rezept} from '../../model/rezept';
import * as model from '../../model/model-interfaces';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-rezept-erfassen',
  templateUrl: './rezept-erfassen.component.html',
  styleUrls: ['./rezept-erfassen.component.css']
})
export class RezeptErfassenComponent implements OnInit {

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
    this.formGroup = this.formBuilder.group(
      {
        'beschreibung': [this.rezeptInput.beschreibung, [Validators.required, Validators.minLength(3)]],
        'titel': [this.rezeptInput.titel, [Validators.required, Validators.minLength(3)]],
        'schwierigkeitsgrad': [this.rezeptInput.schwierigkeitsgrad, Validators.required],
        'art': [this.rezeptInput.art],
        'zeit': [this.rezeptInput.zeit, Validators.required],
        'zubereitung': [this.rezeptInput.zubereitung, Validators.required],
        'anzahlPersonen': [this.rezeptInput.anzahlPersonen, Validators.required],
        'zutaten': this.formBuilder.array([]),
        'kalorien': [this.rezeptInput.naehrwerte.kalorien],
        'fett': [this.rezeptInput.naehrwerte.fett],
        'eiweiss': [this.rezeptInput.naehrwerte.eiweiss],
        'kohlenhydrate': [this.rezeptInput.naehrwerte.kohlenhydrate],
        'image': ['']
      }
    );
    this.zutatenListe = this.formGroup.get('zutaten') as FormArray;
  }

  private createZutat(): FormGroup {
    return this.formBuilder.group({
      'menge': [0],
      'einheit': [''],
      'zutat': ['']
    });
  }

  addZutat(): void {
    this.zutatenListe.push(this.createZutat());
  }

  removeZutat(arrayIndex: number): void {
    this.zutatenListe.removeAt(arrayIndex);
  }

  get zutatenFormGroup() {
    return this.formGroup.get('zutaten') as FormArray;
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

