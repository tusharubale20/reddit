import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VotePayload } from './vote-button/vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private URL_PREFIX = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post(`${this.URL_PREFIX}/api/votes/`, votePayload);
  }
}
