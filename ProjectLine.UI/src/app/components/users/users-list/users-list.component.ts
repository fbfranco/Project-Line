import { Component, OnInit } from '@angular/core';
// Services
import { UserService } from '../../../services/user.service';
// Models
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  HeaderColumns = ['Name', 'LastName', 'Email', 'Role', 'Active', 'Edit', 'Delete'];
  UsersList: User[];
  // RolesList: Role[];
  constructor(public userService: UserService) { }

  ngOnInit() {
    this.getUserList();
  }

  private getUserList(): void {
    this.userService.getUsersList().subscribe((List: User[]) => {
      this.UsersList = List;
    }, error => {
      console.log('Error getting the list of Users');
    });
  }

  getRoleName(id: number): string {
    let roleName = 'undefined';
    RoleData.forEach(Rol => {
      if (Rol.RoleID === id) {
        roleName = Rol.Name;
      }
    });
    return roleName;
  }

  newUser() {
    this.userService.selectedUser = new User();
  }

}

export interface Roled {
  RoleID: number;
  Name: string;
  Description: string;
}

const RoleData: Roled[] = [
  { RoleID: 1, Name: 'Admin', Description: 'This is a Administrator' },
  { RoleID: 2, Name: 'User', Description: 'This is a User' },
  { RoleID: 3, Name: 'Client', Description: 'This is a Client' }
];
