
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Services
import { UserService } from '../../../services/user.service';
import { RolService } from '../../../services/rol.service';

// Models
import { User } from '../../../models/user.model';
import { Rol } from '../../../models/rol';

// Material
import { MatSnackBar } from '@angular/material';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

export interface Role {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})

export class UsersAddComponent implements OnInit {

  titleForm = '';

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public roleService: RolService,
    public snackBar: MatSnackBar
  ) {
   }

  selectedValue: string;

  roles: Rol;

  ngOnInit() {
    this.titleForm = this.userService.selectedUser.UserID === undefined ? `Add User` : `Edit User`;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    if (typeof form.value.ProjectID === 'undefined') {
      this.userService.createUser(form.value).subscribe(data => {
        this.openSnackBar('Saved');
        this.navigate_to_user_home_page();
        this.resetForm();
      });
    } else {
      this.userService.updateUser(form.value).subscribe(data => {
        this.openSnackBar('Saved');
        this.navigate_to_user_home_page();
        this.resetForm();
      });

    }
  }

  navigate_to_user_home_page() {
    this.router.navigate(['/User']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
      horizontalPosition: 'right',
    });
  }

  resetForm() {
    this.userService.selectedUser = new User();
  }



}
