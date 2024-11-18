import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatCard} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {ShowroomService} from '../services/showroom.service';
import {MatDialog} from '@angular/material/dialog';
import {AddShowroomDialogComponent} from '../shared/add-showroom-dialog/add-showroom-dialog.component';
import {ViewShowroomDialogComponent} from '../shared/view-showroom-dialog/view-showroom-dialog.component';
import {EditShowroomDialogComponent} from '../shared/edit-showroom-dialog/edit-showroom-dialog.component';
import {Showroom} from '../models/Showroom.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {DeleteDialogComponent} from '../shared/delete-dialog/delete-dialog.component';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-showrooms',
  standalone: true,
  imports: [
    MatTable,
    MatCard,
    MatButton,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    AddShowroomDialogComponent,
    MatPaginator,
    MatSort,
    MatSortModule,
    MatIcon,
    MatIconButton,
    MatNoDataRow
  ],
  templateUrl: './showrooms.component.html'
})
export class ShowroomsComponent implements OnInit {
  constructor(private showroomService: ShowroomService) { }
  displayedColumns: string[] = ['name','commercialRegistrationNumber','contactNumber', 'action'];
  showrooms = new MatTableDataSource<Showroom>([]);
  totalItems = 0;
  pageSize = 5;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  openViewShowroomDialog(showroom: any){
    this.showroomService.getShowroom(showroom.name).subscribe((data:any)=> {
      const dialogRef = this.dialog.open(ViewShowroomDialogComponent,
        {data:data}
        );

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result !== undefined) {
        }
      });
    })
  }
  openEditShowroomDialog(showroom: any){
    this.showroomService.getShowroom(showroom.name).subscribe((data:any)=> {
      const dialogRef = this.dialog.open(EditShowroomDialogComponent,
        {data:data}
      );

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.error(result)
        if (result !== undefined) {
            const index = this.showrooms.data.findIndex((showroom)=>showroom.name == result.name);
            this.showrooms.data[index] = result;
            this.showrooms.data = [...this.showrooms.data]
        }
      });
    })
  }
  ngOnInit(): void {
    this.fetchShowrooms(0,this.pageSize,'name','asc')
  }

  readonly dialog = inject(MatDialog);

  openCreateShowroomDialog(): void {
    const dialogRef = this.dialog.open(AddShowroomDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.showrooms.data = [...this.showrooms.data, {...result}]
        this.totalItems = this.totalItems+1;
      }
    });
  }
  fetchShowrooms(page:any, pageSize:any, sortField: string, sortDirection: string){
    this.showroomService.getShowrooms(page,pageSize,sortField,sortDirection).subscribe((data:any)=> {
      this.showrooms.data = data.content;
      this.totalItems = data.totalElements;
    })
  }
  onPageChange(event: any) {
    const sortField = this.sort.active || 'id'; // Default sort field
    const sortDirection = this.sort.direction || 'asc'; // Default sort direction

    this.fetchShowrooms(event.pageIndex, event.pageSize,sortField,sortDirection); // Fetch data on page change
  }
  onSortChange(event: any) {
    const sortField = event.active;
    const sortDirection = event.direction;
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;

    this.fetchShowrooms(pageIndex, pageSize, sortField, sortDirection);
  }
  onDelete(showroom:any){
    const dialogRef = this.dialog.open(DeleteDialogComponent,{
      data:showroom
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.showrooms.data = this.showrooms.data.filter((showroom)=>showroom.name !=result.name)
        this.totalItems = this.totalItems-1;

      }
    });
  }
}
