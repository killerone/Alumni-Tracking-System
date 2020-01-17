import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  serverUrl = "http://localhost:3000/user/";

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    this.http
      .post<{
        userid: string;
      }>(this.serverUrl + "login", {
        email: email,
        password: password
      })
      .subscribe(
        result => {
          localStorage.setItem("id", result["id"]);
          this.router.navigate(["/"]);
        },
        error => {
          console.log(error);
        }
      );
  }

  signUp(user) {
    this.http.post(this.serverUrl + "signup", user).subscribe(res => {
      console.log(res);
      localStorage.setItem("id", res["id"]);
      this.router.navigate(["/"]);
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }
}
