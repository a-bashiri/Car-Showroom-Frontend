import {Component, inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {ShowroomService} from '../../services/showroom.service';

@Component({
  selector: 'app-add-showroom-dialog',
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
  templateUrl: './add-showroom-dialog.component.html'
})
export class AddShowroomDialogComponent {
  constructor(private showroomService: ShowroomService) {
  }
  showroom  = {
    name: '',
    commercialRegistrationNumber: '',
    managerName:'',
    contactNumber:'',
    address:''
  }
  readonly dialogRef = inject(MatDialogRef<AddShowroomDialogComponent>);

  onCancel(){
    this.dialogRef.close();
  }
  onSubmit(){
    this.showroomService.createShowroom(this.showroom).subscribe((data:any)=> {
      this.dialogRef.close(data)
    })
  }
}
