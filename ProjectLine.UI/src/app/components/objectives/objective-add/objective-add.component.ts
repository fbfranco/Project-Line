import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Objective } from '../../../models/objective.model';

@Component({
  selector: 'app-objective-add',
  templateUrl: './objective-add.component.html',
  styleUrls: ['./objective-add.component.css']
})
export class ObjectiveAddComponent implements OnInit {

  @Input() objective: Objective;
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  objectForm: FormGroup;

  constructor() {    

  }

  ngOnInit() {

  }

}
