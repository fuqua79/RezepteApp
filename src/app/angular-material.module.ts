import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSelectModule
  ]
})
export class AngularMaterialModule {
}
