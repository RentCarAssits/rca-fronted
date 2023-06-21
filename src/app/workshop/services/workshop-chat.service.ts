import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WorkshopChatService {
  constructor(private http: HttpClient) { }
  sendMessage(message: string) {
    return this.http.post('http://localhost:3003/message', { prompt: message });
  }
}
