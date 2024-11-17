import {Component, Inject, inject, Input} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
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
  selector: 'app-delete-dialog',
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
    FormsModule,
    MatDialogClose
  ],
  templateUrl: './delete-dialog.component.html'
})
export class DeleteDialogComponent {
  constructor(private showroomService: ShowroomService,@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);

  onClose(){
    this.dialogRef.close();
  }
  onDelete(){
    this.showroomService.deleteShowroom(this.data.name).subscribe(()=> {
      this.dialogRef.close(this.data)
    })
  }
}
