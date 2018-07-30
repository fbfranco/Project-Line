import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, EmailValidator } from '@angular/forms';
// Services
import { UserService } from '../../../services/user.service';
import { RolService } from '../../../services/rol.service';
// Models
import { User } from '../../../models/user.model';
import { Rol } from '../../../models/rol';
// Material
import { MatSnackBar } from '@angular/material';
// Others
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { passwordConfirming } from '../../../validators/match-password.validator';
import { ParentErrorStateMatcher } from '../../../validators/error-matcher.validator';
/* import { ValidateEmailNotTaken } from '../../../validators/unique-email.validator'; */


@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
  /*   providers: [ValidateEmailNotTaken] */
})
export class UsersAddComponent implements OnInit {
  titleForm = '';
  ListRole: Rol[];
  optionsRole: string[] = [];
  registrationFormGroup: FormGroup;
  PasswordFormGroup: FormGroup;
  parentErrorStateMatcher = new ParentErrorStateMatcher();
  passwordPattern = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}';
  test: boolean;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public roleService: RolService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    /*     private validateEmailNotTaken: ValidateEmailNotTaken */
  ) { }
  ngOnInit() {
    this.getRolesList();
    this.addOrEditForm();
  }

  buildForm() {
    this.PasswordFormGroup = this.formBuilder.group({
      Password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: passwordConfirming });

    this.registrationFormGroup = this.formBuilder.group({
      UserID: [0],
      FirstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9].*')]],
      LastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9].*')]],
      Email: ['', [Validators.required, Validators.email]],
      RoleID: ['', Validators.required],
      Company: ['', Validators.pattern('^[a-zA-Z0-9].*')],
      Address: ['', Validators.pattern('^[a-zA-Z0-9].*')],
      Phone: ['', [Validators.pattern('^[-0-9()+].*')]],
      Mobile: ['', [Validators.pattern('^[-0-9()+].*')]],
      Password: [''],
      Active: [{ value: true, disabled: true }],
      PasswordFormGroup: this.PasswordFormGroup
    });
  }

  addOrEditForm() {
    this.route.params.subscribe(param => {
      if (param['id'] === undefined) {
        setTimeout(() => {
          this.buildForm();
        }, 200);
        this.titleForm = 'Add User';
      } else {
        setTimeout(() => {
          this.newFormEditUser();
        }, 200);
        this.titleForm = 'Edit User';
      }
    });
  }

  newFormEditUser() {
    this.PasswordFormGroup = this.formBuilder.group({
      Password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: passwordConfirming });

    this.registrationFormGroup = this.formBuilder.group({
      UserID: [this.userService.selectedUser.UserID],
      FirstName: [this.userService.selectedUser.FirstName, [Validators.required, Validators.pattern('^[a-zA-Z0-9].*')]],
      LastName: [this.userService.selectedUser.LastName, [Validators.required, Validators.pattern('^[a-zA-Z0-9].*')]],
      Email: [this.userService.selectedUser.Email, [Validators.required, Validators.email]],
      RoleID: [this.userService.selectedUser.RoleID, Validators.required],
      Company: [this.userService.selectedUser.Company, Validators.pattern('^[a-zA-Z0-9].*')],
      Address: [this.userService.selectedUser.Address, Validators.pattern('^[a-zA-Z0-9].*')],
      Phone: [this.userService.selectedUser.Phone, [Validators.pattern('^[-0-9()+].*')]],
      Mobile: [this.userService.selectedUser.Mobile, [Validators.pattern('^[-0-9()+].*')]],
      Password: [''],
      Active: [{ value: this.userService.selectedUser.Active, disabled: false }],
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
    this.registrationFormGroup.value.Password = this.PasswordFormGroup.value.Password;
    this.registrationFormGroup.value.Active = true;
    this.userService.createUser(this.registrationFormGroup.value)
      .subscribe(good => {
        this.openSnackBar('Saved');
        this.navigate_to_user_home_page();
      });
  }
  editUsers() {
    this.registrationFormGroup.value.Password = this.PasswordFormGroup.value.Password;
    this.userService.updateUser(this.registrationFormGroup.value)
      .subscribe(good => this.navigate_to_user_home_page(),
        error => console.error(error));
  }
  navigate_to_user_home_page() {
    this.router.navigate(['/Users']);
  }
}
