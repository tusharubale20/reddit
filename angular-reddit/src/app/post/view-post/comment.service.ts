import { Injectable } from '@angular/core';
import { CommentPayload } from './comment.payload';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private URL_PREFIX = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  postComment(commentPayload: CommentPayload): Observable<any>{
    return this.http.post(`${this.URL_PREFIX}/api/comments`,commentPayload);
  }

  getAllCommentsForPost(postId: number): Observable<Array<CommentPayload>> {
    return this.http.get<Array<CommentPayload>>(`${this.URL_PREFIX}/api/comments/by-post/${postId}`);
  }

  getAllCommentsByUser(username: String): Observable<Array<CommentPayload>> {
    return this.http.get<Array<CommentPayload>>(`${this.URL_PREFIX}/api/comments/by-user/${username}`);
  }
  
}
