import { User } from "./../models/user.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  serverUrl = "http://localhost:3000/user/";

  constructor(private http: HttpClient) {}

  getUser(id: string) {
    return this.http.get(this.http + id);
  }

  editUser(id: String, user: User) {
    return this.http.post(this.serverUrl + id, user);
  }

  createUser(user: User) {
    return this.http.post(this.serverUrl + "signup", user);
  }

  searchUser(name: String) {
    return this.http.post(this.serverUrl + "search", { word: name });
  }

  getColleges() {
    return this.http.get(this.http + "colleges");
  }
}
