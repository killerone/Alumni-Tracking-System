import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class WebsocketService {
  constructor(private socket: Socket) {}

  sendMessage(data: { name: string; message: string }) {
    this.socket.emit("message", data);
  }

  getNewMessage() {
    const observable = new Observable<{ user: String; message: String }>(
      observer => {
        this.socket.on("new message", data => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );
    return observable;
  }

  joinRoom(data: { u1id: string; u2id: string }) {
    this.socket.emit("join", data);
  }

  typing(data) {
    this.socket.emit("typing", data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean }>(observer => {
      this.socket.on("typing", data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
