import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { SigninComponent } from './components/signin/signin.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiServiceService as Api } from './services/api-service.service';
import { MatCard } from '@angular/material/card';
import { MarkerService } from './services/marker.service';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

import { MatSortModule } from '@angular/material/sort';
import { MapComponent } from './components/map/map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit {

  title = 'pig-tracker';
  isChecked = false;
  showFiller = false;

  key = "";
  name = "";
  phone = "";
  date = "";
  time = "";
  status = "";
  breed = "";
  location = "";
  pid = "";
  lat = "";
  long = "";
  details = "";

  data :any = []
  sortedData:any =[]

  displayedColumns: string[] = ['location', 'name', 'time', 'status', 'details', 'remove', 'approve'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatCard) card!: MatCard ;
  @ViewChild(MapComponent) map!: MapComponent;


  ngOnInit(): void {

  }

  constructor(private dialog : MatDialog, private api : Api, private marker : MarkerService){
    this.getAllPigs()
    this.api.getPig().subscribe({
      next:(response)=>{

        this.data=response

      }
    })
  }

  openDeleteDialog(key:any){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data:{
        dataKey:key
      }
    }).afterClosed().subscribe(val=>{
      this.getAllPigs();
      this.marker.markLocation(this.map.map)
    })
  }

  signinDialog(key:any){
    const dialogRef = this.dialog.open(SigninComponent, {
      width: '500px',
      data:{
        dataKey:key
      }
    }).afterClosed().subscribe(val=>{

     
      this.getAllPigs();

      


    })

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '400px'
    }).afterClosed().subscribe(val=>{
      this.getAllPigs();
      this.marker.markLocation(this.map.map)


    })
  }

  
  getPigReport(row : any){


    this.key = row.key;
    this.name = row.data.name;
    this.phone = row.data.phone;
    this.date = row.data.date;
    this.time = row.data.time;
    this.lat = row.data.lat;
    this.long = row.data.long;
    this.status = row.data.status;
    this.breed = row.data.breed;
    this.location = row.data.location;
    this.pid = row.data.pid;
    this.details = row.data.details;
  }

  deletePig(key:any){
    this.api.deletePig(key).subscribe({
      next:(response)=>{
        alert("success");
        this.getAllPigs();
      },
      error:(error)=>{
        alert("Error while getting pig");
      }
    })
  }



 

  getAllPigs(){
    this.api.getPig().subscribe({
      next:(response)=>{
        

        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        
      },
      error:(error)=>{
        alert("Error while getting pig");
      }
    })
  }

  sortData(sort: Sort) {
    this.api.getPig().subscribe({
      next:(response)=>{

        this.data= response

      
      }
    })

    if (!sort.active || sort.direction === '') {
      this.sortedData = this.data;
      return;
    }

    this.sortedData = this.data.sort((a:any, b:any) => {
      
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'location':
          console.log("l")
          return compare(a.data.location, b.data.location, isAsc);
        case 'name':
          console.log("n")

          return compare(a.data.name, b.data.name, isAsc);
        case 'time':
          console.log("t")

          return compare(a.data.time, b.data.time, isAsc);
        case 'status':
          console.log("s")

          return compare(a.data.status, b.data.status, isAsc);
        default:
          console.log("gy")

          return 0;
      }
    });

    this.dataSource = new MatTableDataSource(this.sortedData)
    this.dataSource.paginator = this.paginator;


}


  

 

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

