import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';
import {CarService} from '../services/car.service';
import {MatDialog} from '@angular/material/dialog';
import {AddCarDialogComponent} from '../shared/add-car-dialog/add-car-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {Showroom} from '../models/Showroom.model';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatNoDataRow
  ],
  templateUrl: './cars.component.html'
})
export class CarsComponent implements OnInit{
  cars:any = new MatTableDataSource<Showroom>([]);
  totalItems = 0;
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['vin','maker','model','modelYear','price','showroomName','showroomContactNumber'];
  readonly dialog = inject(MatDialog);
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.fetchCars(0,this.pageSize)
  }

  openCreateCarDialog(){
    const dialogRef = this.dialog.open(AddCarDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

      }
    });
  }

  fetchCars(page:any, pageSize:any,maker?: string, showroomName?: string){
    this.carService.getCars(page,pageSize,maker,showroomName).subscribe((data:any)=> {
      console.error(data)
      this.cars.data = data.content;
      this.totalItems = data.totalElements;
    })
  }

  onPageChange(event: any) {
    this.fetchCars(event.pageIndex, event.pageSize,this.filterMaker,this.filterShowroomName);
  }

  filterMaker: string = '';
  filterShowroomName: string = '';

  applyFilter() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;

    this.fetchCars(pageIndex, pageSize, this.filterMaker, this.filterShowroomName);
  }

  resetFilter(){
    this.filterMaker = '';
    this.filterShowroomName = '';

    this.fetchCars(0, 5, this.filterMaker, this.filterShowroomName);
  }


}
