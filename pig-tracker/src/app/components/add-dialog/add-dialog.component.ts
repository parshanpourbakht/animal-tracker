import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { ApiServiceService as Api }  from 'src/app/services/api-service.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']

})
export class AddDialogComponent implements OnInit {

  report_data !: FormGroup;

  constructor(private formBuilder : FormBuilder, private api : Api,
     @Inject(MAT_DIALOG_DATA) public formData:any, public datepipe : DatePipe) { }

  isChecked = false;

  ngOnInit(): void {
    console.log(this.formData)

    let currentDate = this.datepipe.transform((new Date), 'MM/dd/yyyy');
    let currentTime = this.datepipe.transform((new Date), 'h:mm:ss');

    if(this.isChecked){
      this.report_data = this.formBuilder.group({
        name : ['', Validators.required] ,
        phone : ['', Validators.required] ,
        date : [currentDate], 
        time: [currentTime],
        status : [false],
        breed : ['', Validators.required],
        location : ['', Validators.required],
        lat : ['', Validators.required],
        long : ['', Validators.required],
        pid : ['', Validators.required],
        details : ['']
      })
    }else{
      this.report_data = this.formBuilder.group({
        name : ['', Validators.required] ,
        phone : ['', Validators.required] ,
        date : [currentDate], 
        time: [currentTime],
        status : [false],
        breed : ['', Validators.required],
        location : ['', Validators.required],
        lat : [''],
        long : [''],
        pid : ['', Validators.required],
        details : ['']
      })

    }
    
  }

  addPig(){
    console.log(this.report_data.value.lat)
    if(this.report_data.valid){

      switch(this.report_data.value.location) { 
        case 'SFU': { 
          this.report_data.value.lat = 49.2781
          this.report_data.value.long = 122.9199
          break; 
        } 
        case 'Beijing': { 
          this.report_data.value.lat = 39.9042 
          this.report_data.value.long = 116.4074
          break; 
        } 
        case 'Tokyo': {
          this.report_data.value.lat = 35.6762 
          this.report_data.value.long = 139.6503
          break;
        }
        
     } 

      this.api.postPig(this.report_data.value).subscribe({
        next:(response)=>{
          alert("Pig Added Succesfully");

        },

        error:()=>{
          alert("Error when Pig Added");

        }
      })
    }
  }

}
