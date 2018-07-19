import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { RolService } from '../../../services/rol.service';
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
    private rolSnackBar: MatSnackBar
  ) { }
  RoleFormGroup: FormGroup;

  ngOnInit() {
    this.EditRolForm();
  }
  EditRolForm() {
    this.RoleFormGroup = this.rolFormBuilder.group({
      RoleId: this.rolService.selectedRol.RoleId,
      Title: new FormControl({ value: this.rolService.selectedRol.Title, disabled: true }),
      Description: this.rolService.selectedRol.Description
    });
  }
  editRol() {
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
