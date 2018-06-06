import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatTableDataSource} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {  

    //Datepicker
    date = new FormControl({ value: new Date(), disabled: true });
    //min Date
    mindate =  new Date();

    //Validate Input
    FormControl = new FormControl('', [
      Validators.required
    ]);
  
    //Call Function to active err
    matcher = new MyErrorStateMatcher();

    //Grid Add Phase to Project
    displayedColumns = ['nro','phase', 'description', 'startdate', 'enddate','edit','delete'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    AddRows(filterValue: string)
  {  
    let res=ELEMENT_DATA.length+1;
    ELEMENT_DATA.push({nro:res,phase: 'phase'+res, description: 'Description', startdate: '05/06/2018', enddate: '06/06/2018',edit:'Edit',delete:'Delete'});   
    console.log(this.dataSource);
    filterValue = '';
    this.dataSource.filter = filterValue;
  }
  DeleteRows(index: number){

    //alert(index);
    let r=index-1;
    //alert(r);
    if(confirm("Surely you want to eliminate this phase?")){

        ELEMENT_DATA.splice(r,1); 
        let filterValue = '';
        this.dataSource.filter = filterValue;
        let res=ELEMENT_DATA.length+1;
    }
    
  }

  constructor() { }
  ngOnInit() {
  
  }

}
export interface  PeriodicElement {
  nro:number;
  phase: string;
  description: string;
  startdate: string;
  enddate: string;
  edit:string;
  delete: string;

  
}
const ELEMENT_DATA: PeriodicElement[] = [
  // {nro:1,phase: 'phase', description: 'Description', startdate: '05/06/2018', enddate: '06/06/2018',edit:'Edit',delete:'Delete'},
  // {nro:2,phase: 'phase', description: 'Description', startdate: '05/06/2018', enddate: '06/06/2018',edit:'Edit',delete:'Delete'},
  // {nro:3,phase: 'phase', description: 'Description', startdate: '05/06/2018', enddate: '06/06/2018',edit:'Edit',delete:'Delete'},
  // {nro:4,phase: 'phase', description: 'Description', startdate: '05/06/2018', enddate: '06/06/2018',edit:'Edit',delete:'Delete'},
  // {nro:5,phase: 'phase', description: 'Description', startdate: '05/06/2018', enddate: '06/06/2018',edit:'Edit',delete:'Delete'}
]