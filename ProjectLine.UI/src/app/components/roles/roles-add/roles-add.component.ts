import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { RolService } from '../../../services/rol.service';
import { HelperService } from '../../../services/helper.service';
@Component({
  selector: 'app-roles-add',
  templateUrl: './roles-add.component.html',
  styleUrls: ['./roles-add.component.css']
})
export class RolesAddComponent implements OnInit {

  constructor(
    private rolFormBuilder: FormBuilder,
    private rolService: RolService,
    private rolDialogRef: MatDialogRef<RolesAddComponent>,
    private rolSnackBar: MatSnackBar,
    private helperService: HelperService
  ) { }
  RoleFormGroup: FormGroup;

  ngOnInit() {
    this.EditRolForm();
  }
  EditRolForm() {
    this.RoleFormGroup = this.rolFormBuilder.group({
      RoleId: this.rolService.selectedRol.RoleID,
      Title: new FormControl({ value: this.rolService.selectedRol.Title, disabled: true }),
      Description: this.rolService.selectedRol.Description
    });
  }
  editRol() {
    this.helperService.removeWhiteSpaces(this.RoleFormGroup);
    this.rolService.updateRol(this.RoleFormGroup.value)
      .subscribe(good => this.onSaveSuccess(),
        error => console.error(error));
  }
  onSaveSuccess() {
    this.rolSnackBar.open('Saved', null, {
      duration: 2000,
      horizontalPosition: 'right'
    });
    this.rolDialogRef.close('save');
  }
  onCancelClick(): void {
    this.rolDialogRef.close('cancel');
  }

}
