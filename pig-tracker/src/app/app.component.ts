import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiServiceService as Api } from './services/api-service.service';
import { MatCard } from '@angular/material/card';
import { MarkerService } from './services/marker.service';





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

  displayedColumns: string[] = ['location', 'name', 'time', 'status', 'details', 'remove'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatCard) card!: MatCard ;


  ngOnInit(): void {
    console.log(this.getAllPigs());
  }

  constructor(private dialog : MatDialog, private api : Api, private marker : MarkerService){
    
  }



  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '400px'
    }).afterClosed().subscribe(val=>{
      this.getAllPigs();
    })
  }

  
  getPigReport(row : any){

    console.log(row.data.date);

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
        this.dataSource.sort = this.sort;
        
        

      },
      error:(error)=>{
        alert("Error while getting pig");
      }
    })
  }

 

}

