import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/shared/post-model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {

  subredditId: number;
  posts$: PostModel[];
  errorMessage: String;
  noPostsForSubreddit: boolean;
  postDataReady: boolean;
  subredditName:  String;

  constructor(private activatedRoute: ActivatedRoute,
    private postService: PostService) {

    this.noPostsForSubreddit = false;
    this.subredditId = activatedRoute.snapshot.params.id;
    this.postDataReady = false;
    this.errorMessage = undefined;
    this.loadPosts();
   }

  ngOnInit(): void {
  }

  loadPosts() {
    this.postService.getAllPostsForSubreddit(this.subredditId)
      .subscribe(data => {
        this.postDataReady = true;
        
        this.posts$ = data;
        if(data.length === 0) {
          this.noPostsForSubreddit = true;
        }
       
        this.subredditName = this.posts$[0].subredditName;
      }, error => {
        this.errorMessage = error.error;
      })
  }

}
