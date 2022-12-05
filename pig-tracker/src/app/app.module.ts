import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MapComponent } from './components/map/map.component';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';



import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { marker } from 'leaflet';
import { MarkerService } from './services/marker.service';
import { SigninComponent } from './components/signin/signin.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

import { MatSelect, MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    AddDialogComponent,
    MapComponent,
    SigninComponent,
    DeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule, 
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    DatePipe,
    MatSidenavModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule

  ],
  providers: [DatePipe, MarkerService],
  bootstrap: [AppComponent],
})
export class AppModule { }
