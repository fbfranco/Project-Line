import { Component, OnInit } from '@angular/core';
// Services
import { UserService } from '../../../services/user.service';
import { RolService } from '../../../services/rol.service';
// Models
import { User } from '../../../models/user.model';
import { Rol } from '../../../models/rol';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  HeaderColumns = ['Name', 'LastName', 'Email', 'Role', 'Active', 'Edit', 'Delete'];
  UsersList: User[];
  RolesList: Rol[];
  constructor(public userService: UserService, public rolService: RolService) { }

  ngOnInit() {
    this.getUserList();
  }

  private getUserList(): void {
    this.getRoleList();
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

  getRoleName(id: number): string {
    let roleName = 'undefined';
    this.RolesList.forEach(Role => {
      if (Role.RoleID === id) {
        roleName = Role.Title;
      }
    });
    return roleName;
  }

  newUser() {
    this.userService.selectedUser = new User();
  }

}
