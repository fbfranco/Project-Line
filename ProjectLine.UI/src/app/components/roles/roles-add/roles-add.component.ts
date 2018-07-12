import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { RolService } from '../../../services/rol.service';
@Component({
  selector: 'app-roles-add',
  templateUrl: './roles-add.component.html',
  styleUrls: ['./roles-add.component.css']
})
export class RolesAddComponent implements OnInit {

  constructor(
    private objectiveFormBuilder: FormBuilder,
    private objectiveService: RolService,
    private objectiveDialogRef: MatDialogRef<RolesAddComponent>,
    private objectiveSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

}
