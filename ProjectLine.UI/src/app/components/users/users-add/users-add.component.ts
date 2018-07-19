
import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';

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

// Others
import { MatchPasswordDirective  } from '../../shared/Directive';

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
  ListRole: Rol[];
  optionsRole: string[] = [];
  Match: boolean;

  registrationFormGroup: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public roleService: RolService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.registrationFormGroup = this.formBuilder.group({
      UserID: [0],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      RoleID: ['', Validators.required],
      Company: [''],
      Address: [''],
      Phone: ['', Validators.pattern('[-0-9()+ ]+')],
      Mobile: ['', Validators.pattern('[-0-9()+ ]+')],
      Username: ['', Validators.required],
      Status: [false],
      Password: ['', Validators.required],
      ConfirmPassword: ['', [Validators.required, ]],
    });
  }

  selectedValue: string;

  ngOnInit() {
    this.titleForm = this.userService.selectedUser.UserID === undefined ? `Add User` : `Edit User`;
    this.getRolesList();
    this.Match = true;
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

  setOptionsRole() {
    for (let index = 0; index < this.ListRole.length; index++) {
      const element = this.ListRole[index];
      this.optionsRole.push(element.Description);
    }
  }

  getRolesList() {
    this.roleService.getRolesList().subscribe((datalistRole: Rol[]) => {
      this.ListRole = datalistRole;
      this.setOptionsRole();
    }, error => {
      console.log('Error getting the list of Phases');
    });

  }

  // For save users
  submitUsers() {
    console.log(this.registrationFormGroup.controls);
    if (this.registrationFormGroup.controls.UserID.value) {
      this.editUsers();
    } else {
      this.saveUsers();
    }
  }

  saveUsers() {
    this.userService.createUser(this.registrationFormGroup.value)
      .subscribe(error => console.error(error));
  }

  editUsers() {
    this.userService.updateUser(this.registrationFormGroup.value)
      .subscribe(error => console.error(error));
  }

}
