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

  // List Users
  ListUsers: User[];

  constructor(
    public userService: UserService,
  ) { }

  ngOnInit() {
  }

  newUser() {
    this.userService.selectedUser = new User();
  }
}
