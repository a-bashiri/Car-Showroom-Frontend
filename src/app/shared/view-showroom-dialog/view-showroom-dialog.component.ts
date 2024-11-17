import {Component, Inject, inject, Input} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {ShowroomService} from '../../services/showroom.service';

@Component({
  selector: 'app-view-showroom-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatDialogActions,
    MatButton,
    MatSelect,
    MatOption,
    MatLabel,
    NgForOf,
    FormsModule
  ],
  templateUrl: './view-showroom-dialog.component.html'
})
export class ViewShowroomDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  readonly dialogRef = inject(MatDialogRef<ViewShowroomDialogComponent>);

  onClose(){
    this.dialogRef.close();
  }
}
