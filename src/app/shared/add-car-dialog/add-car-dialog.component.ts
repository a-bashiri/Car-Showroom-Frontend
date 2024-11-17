import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ShowroomService} from '../../services/showroom.service';
import {MatDialogRef} from '@angular/material/dialog';
import {CarService} from '../../services/car.service';
import {Car} from '../../models/Car.model';
import {data} from 'autoprefixer';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-add-car-dialog',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './add-car-dialog.component.html',
})
export class AddCarDialogComponent implements OnInit{
  constructor(private carService: CarService, private showroomService: ShowroomService) {
  }
  car:Car  = {
    vin: '',
    maker: '',
    model:'',
    modelYear:0,
    price:0,
    showroomName:''
  }
  readonly dialogRef = inject(MatDialogRef<AddCarDialogComponent>);
  showrooms:any=[]
  onCancel(){
    this.dialogRef.close();
  }
  onSubmit(){
    console.error(this.car)
    this.carService.createCar(this.car).subscribe((data:any)=> {
      console.error(data)
      this.dialogRef.close()
    })
  }

  ngOnInit(): void {
    this.showroomService.getShowroomsWithoutPage().subscribe((data:any)=>{
      this.showrooms = data
    })
  }
}
