import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log(JSON.stringify(this.users))
    }, err => {
      this.snackBar.open(`${err['error']['message']}`, 'Fechar', {duration: 2000});
    });
  }
}
