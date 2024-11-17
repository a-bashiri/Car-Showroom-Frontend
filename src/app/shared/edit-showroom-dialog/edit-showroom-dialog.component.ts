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
import {NgForOf, NgIf} from '@angular/common';
import {ShowroomService} from '../../services/showroom.service';

@Component({
  selector: 'app-edit-showroom-dialog',
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
    NgIf
  ],
  templateUrl: './edit-showroom-dialog.component.html'
})
export class EditShowroomDialogComponent {
  constructor(private showroomService: ShowroomService,@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  readonly dialogRef = inject(MatDialogRef<EditShowroomDialogComponent>);

  onClose(){
    this.dialogRef.close();
  }
  onUpdate(){
    this.showroomService.updateShowroom(this.data).subscribe((data:any)=> {
      this.dialogRef.close(data)
    })
  }
}
