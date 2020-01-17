import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  isLoggedIn$: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("id")) {
      this.isLoggedIn$ = true;
    }
  }

  public tologin() {

    this.router.navigate(['login']);
  }

  public onLogout() {
    this.authService.logout();
  }

}
