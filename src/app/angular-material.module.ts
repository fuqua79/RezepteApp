import {NgModule} from '@angular/core';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatTooltipModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatDialogModule, MatAutocompleteModule, MatSelectModule
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
