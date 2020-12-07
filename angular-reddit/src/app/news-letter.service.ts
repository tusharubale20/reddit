import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsLetterService {

  private readonly BASE_URL = "http://localhost:8080" 

  constructor(private http: HttpClient) {

  }

  addPushSubscriber(sub:any) {
      return this.http.post(`${this.BASE_URL}/api/notifications`, sub);
  }

  send() {
      return this.http.post(`${this.BASE_URL}/api/notifications/newsletter`, null);
  }

}
