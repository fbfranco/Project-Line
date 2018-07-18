
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
import { RegistrationValidator } from '../../shared/register.validator';
import { MatchPassword } from '../../shared/Validators';

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
  passwordFormGroup: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public roleService: RolService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    // this.passwordFormGroup = this.formBuilder.group({
    //   password: ['', Validators.required],
    //   repeatPassword: ['', [Validators.required ]])
    this.registrationFormGroup = this.formBuilder.group({
      UserID: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      RoleID: ['', Validators.required],
      Company: ['', Validators.required],
      Address: ['', Validators.required],
      Phone: ['', Validators.required],
      Mobile: ['', Validators.required],
      Username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', [Validators.required, MatchPassword('123456') ]]
      // passwordFormGroup: this.passwordFormGroup
    });
   }

  selectedValue: string;

  ngOnInit() {
    this.titleForm = this.userService.selectedUser.UserID === undefined ? `Add User` : `Edit User`;
    this.getRolesList();
    this.Match = true;
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

  inputMatch(event: any) {
    console.log(event.target.value);
    console.log(this.userService.selectedUser.Password);
    if (event.target.value === this.userService.selectedUser.Password ) {
      this.Match = false;
      console.log(this.Match);
    }
  }


}
