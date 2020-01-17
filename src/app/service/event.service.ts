import { HttpClient } from "@angular/common/http";
import { Events } from "../models/event.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EventService {
  serverUrl = "http://localhost:3000/event/";

  constructor(private http: HttpClient) {}

  getAllEvent() {
    return this.http.get(this.serverUrl);
  }

  createEvent(event: Events) {
    return this.http.post(this.serverUrl + "create", event);
  }

  // not sure about it
  joinEvent(eventid: String, uid: String) {
    // console.log()
    return this.http.post(this.serverUrl + "join/" + eventid, uid);
  }

  deleteEvent(id: String) {
    return this.http.delete(this.serverUrl + id);
  }

  getEvent(id: String) {
    return this.http.get(this.serverUrl + "id");
  }
}
