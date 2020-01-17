import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  name;
  email;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  invite() {
    this.http.post("http://localhost:3000/invite", { email: this.email, name: this.name }).subscribe(msg => {
      alert(msg["message"]);
      this.name = "";
      this.email = "";
    });
  }

}
