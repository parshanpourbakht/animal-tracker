import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pig-tracker';

  constructor(private dialog : MatDialog){

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '600px'
    });

  }

}
