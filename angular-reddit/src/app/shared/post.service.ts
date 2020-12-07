import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from './post-model';
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private URL_PREFIX = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(`${this.URL_PREFIX}/api/posts/`);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(`${this.URL_PREFIX}/api/posts`,postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${this.URL_PREFIX}/api/posts/${id}`);
  }

  getAllPostsForSubreddit(id: number): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.URL_PREFIX}/api/posts/by-subreddit/${id}`);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${this.URL_PREFIX}/api/posts/by-user/${name}`);
  }
  
}
