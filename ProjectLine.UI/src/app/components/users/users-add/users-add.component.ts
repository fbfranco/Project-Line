
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

// Services
import { UserService } from '../../../services/user.service';
import { RolService } from '../../../services/rol.service';

// Models
import { User } from '../../../models/user.model';
import { Rol } from '../../../models/rol';

// Material
import { MatSnackBar, ErrorStateMatcher } from '@angular/material';


// Others
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { passwordConfirming } from '../../../validators/match-password.validator';
import { ParentErrorStateMatcher } from '../../../validators/error-matcher.validator';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})

export class UsersAddComponent implements OnInit {

  titleForm = '';
  ListRole: Rol[];
  optionsRole: string[] = [];
  registrationFormGroup: FormGroup;
  PasswordFormGroup: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public roleService: RolService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.titleForm = this.userService.selectedUser.UserID === undefined ? `Add User` : `Edit User`;
    this.getRolesList();

    this.PasswordFormGroup = this.formBuilder.group({
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    }, { validator: passwordConfirming });

    this.registrationFormGroup = this.formBuilder.group({
      UserID: [0],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      RoleID: ['', Validators.required],
      Company: [''],
      Address: [''],
      Phone: ['', [Validators.required, Validators.pattern('[-0-9()+ ]+')]],
      Mobile: ['', [Validators.required, Validators.pattern('[-0-9()+ ]+')]],
      Username: ['', Validators.required],
      Status: [true],
      PasswordFormGroup: this.PasswordFormGroup
    });
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
    if (this.registrationFormGroup.controls.UserID.value) {
      this.editUsers();
    } else {
      this.saveUsers();
    }
  }

  saveUsers() {
    this.userService.createUser(this.registrationFormGroup.value)
      .subscribe(good => this.navigate_to_user_home_page(),
      error => console.error(error));
  }

  editUsers() {
    this.userService.updateUser(this.registrationFormGroup.value)
      .subscribe(good => this.navigate_to_user_home_page(),
      error => console.error(error));
  }

  navigate_to_user_home_page() {
    this.router.navigate(['/User']);
  }

}
