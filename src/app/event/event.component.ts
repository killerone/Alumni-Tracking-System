import { EventService } from './../service/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events;

  constructor(private evenetService: EventService) { }

  ngOnInit() {
    this.evenetService.getAllEvent().subscribe(events => {
      this.events = events["event"];
      console.log(events);
    })
  } 

  joinEvent(eventid) {
    const uid = localStorage.getItem("id");
    this.evenetService.joinEvent(eventid, uid).subscribe(res => {
      alert(res["msg"]);
    })
  }

}
