import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
// Services
import { RolService } from '../../../services/rol.service';
// Models
import { Rol } from '../../../models/rol';
// Components
import { DialogConfirmationComponent } from '../../dialog/dialog-confirmation/dialog-confirmation.component';
import { RolesAddComponent } from '../roles-add/roles-add.component';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  // List Roles
  ListRoles: Rol[];
  HeaderColumns = ['Title', 'Description', 'Edit'];
  RoleId: number;

  constructor(public rolService: RolService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getRoleList();
  }
  getRoleList() {
    this.rolService.getRolesList().subscribe((datalist: Rol[]) => {
      console.log(datalist);
      this.ListRoles = datalist;
    }, error => {
      console.log('Error getting the list of projects');
    });
  }
  openDialogEdit(rol: Rol) {
    this.rolService.selectedRol = Object.assign({}, rol);
    const dialogRef = this.dialog.open(RolesAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.getRoleList();
      }
    });
  }

}
