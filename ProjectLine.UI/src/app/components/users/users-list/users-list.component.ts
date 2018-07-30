import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
// Services
import { UserService } from '../../../services/user.service';
import { RolService } from '../../../services/rol.service';
import { ProjectService } from '../../../services/project.service';
// Models
import { User } from '../../../models/user.model';
import { Rol } from '../../../models/rol';
// Components
import { DialogConfirmationComponent } from '../../dialog/dialog-confirmation/dialog-confirmation.component';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})

export class UsersListComponent implements OnInit {

  HeaderColumns = ['Name', 'LastName', 'Email', 'Role', 'Active', 'Edit', 'Delete'];
  UsersList: User[];
  RolesList: Rol[] = [];
  ProjectsList: Project[] = [];
  constructor(public userService: UserService,
    public rolService: RolService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.getUserList();
  }

  private getUserList() {
    this.getRoleList();
    this.getProjectsList();
    this.userService.getUsersList().subscribe((List: User[]) => {
      this.UsersList = List;
    }, error => {
      console.log('Error getting the list of Users');
    });
  }

  private getRoleList() {
    this.rolService.getRolesList().subscribe((datalist: Rol[]) => {
      this.RolesList = datalist;
    }, error => {
      console.log('Error getting the list of Roles');
    });
  }

  private getProjectsList() {
    this.projectService.getProjectsList().subscribe((datalist: Project[]) => {
      this.ProjectsList = datalist;
    }, error => {
      console.log('Error getting the list of Projects');
    });
  }

  getRoleName(id: number): string {
    let roleName = 'undefined';
    this.RolesList.forEach(Role => {
      if (Role.RoleID === id) {
        roleName = Role.Description;
      }
    });
    return roleName;
  }

  newUser() {
    this.userService.selectedUser = new User();
  }

  getSelectedUser(user: User) {
    this.userService.selectedUser = Object.assign({}, user);
  }

  private assignedUser(id: number) {
    let assigned = false;
    this.ProjectsList.forEach(project => {
      if (project.UserID === id || project.OwnerID === id) {
        assigned = true;
      }
    });
    return assigned;
  }

  openDialogDelete(id: number) {
    if (!this.assignedUser(id)) {
      const dialogRef = this.dialog.open(DialogConfirmationComponent, {
        data: { title: 'Please confirm...', description: 'Are you sure you want to remove this item?' }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'confirm') {
          this.userService.deleteUser(id)
            .subscribe(data => this.getUserList(),
              error => console.error(error));
        }
      });
    } else {
      this.snackBar.open('The user is assigned to a project and cannot be deleted.', 'OK', {
        horizontalPosition: 'right',
      });
    }
  }

}
