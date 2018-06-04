import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css']
})
export class ProjectAddComponent implements OnInit {  

    date = new FormControl({ value: new Date(), disabled: true });
    mindate =  new Date();

  constructor() { }

  ngOnInit() {
  
  }

}

