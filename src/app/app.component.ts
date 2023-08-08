import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { AddEditComponent } from './add-edit/add-edit.component';
import { PropertyServiceService } from './property-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: String[] = ['id','ptitle', 'pprice', 'plocation', 'pdetails','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog:MatDialog , private service:PropertyServiceService){

  }
  ngOnInit(): void {
    this.getpropertylist();
  }
  edit(){
   const dialogref= this.dialog.open(AddEditComponent)
   dialogref.afterClosed().subscribe( {
    next:(val)=>{
      if(val){
      this.getpropertylist();
    }
    },
   });
  }
  getpropertylist(){
  this.service.getpropertylist().subscribe({
    next:(res)=>{
    this.dataSource=new MatTableDataSource(res);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator; 
    },
     error:console.log,
  })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteproperty(id:number){
    this.service.deleteproperty(id).subscribe({
      next:(res)=>{
        alert("Property Deleted successfully")
        this.getpropertylist();
      },
      error:console.log,
    })
  }
  editProperty(data:any){
  const dialogref= this.dialog.open(AddEditComponent,{
    data,
  }); 
  dialogref.afterClosed().subscribe( {
    next:(val)=>{
      if(val){
      this.getpropertylist();
    }
    },
   });
  }
}
