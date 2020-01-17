import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    const id = localStorage.getItem("id");

    if (id) return true;

    return false;
  }
}
