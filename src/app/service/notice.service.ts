import { Notice } from "./../models/notice.modle";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NoticeService {
  serverUrl = "http://localhost:3000/event/";

  constructor(private http: HttpClient) {}

  getAllNotice() {
    return this.http.get(this.serverUrl);
  }
  createNotice(Notice: Notice) {
    return this.http.post(this.serverUrl + "create", Notice);
  }

  deleteNotice(id: String) {
    return this.http.delete(this.serverUrl + id);
  }

  getNotice(id: String) {
    return this.http.get(this.serverUrl + "id");
  }
}
