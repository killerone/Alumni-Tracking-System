import { UserService } from './service/user.service';
import { User } from './models/user.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alumni-tracking-system';

  currentUser;

  constructor(private userService: UserService) {
    userService.getUser(localStorage.getItem("id")).subscribe(user => {
      console.log(user);
      this.currentUser = user;
    }, err => {
      console.log(err);
    });
  }

}
