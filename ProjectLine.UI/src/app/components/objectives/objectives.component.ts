import { Component, OnInit } from '@angular/core';

import { Objective } from '../../models/objective.model';
import { ObjectiveService } from '../../services/objective.service';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.css']
})
export class ObjectivesComponent implements OnInit {

  constructor(private objectiveService: ObjectiveService) { }

  ngOnInit() {
  }

}
