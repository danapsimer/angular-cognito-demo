import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatFormFieldModule,
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatTabsModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class CustomMaterialModule { }
