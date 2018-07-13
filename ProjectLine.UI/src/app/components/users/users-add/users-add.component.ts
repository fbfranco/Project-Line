
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl, Validators } from '@angular/forms';

// Services
import { UserService } from '../../../services/user.service';
// import { RoleService } from '../../../services/role.service';

// Models
import { User } from '../../../models/user.model';
// import { Role } from '../../../models/Role.model';

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

  selectedValue: string;

  roles: Role[] = [
    {value: '0', viewValue: 'Admin'},
    {value: '1', viewValue: 'PO'},
    {value: '2', viewValue: 'Owner'}
  ];


  titleForm = '';

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public snackBar: MatSnackBar
  ) {
   }

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
