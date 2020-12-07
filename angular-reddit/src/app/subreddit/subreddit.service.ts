import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubredditModel } from './post-model';
import { CreateSubredditRequest } from './create-subreddit/create-subreddit-request';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  private URL_PREFIX = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>(`${this.URL_PREFIX}/api/subreddit`);
  }

  createSubreddit(createSubredditRequest: CreateSubredditRequest): Observable<any> {
    return this.http.post(`${this.URL_PREFIX}/api/subreddit`,createSubredditRequest);
  }

}
