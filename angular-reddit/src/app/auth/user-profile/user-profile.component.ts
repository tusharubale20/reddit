import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/shared/post-model';
import { CommentPayload } from 'src/app/post/view-post/comment.payload';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/post/view-post/comment.service';
import { PostService } from 'src/app/shared/post.service';
import { NewsLetterService } from 'src/app/news-letter.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  
  readonly VAPID_PUBLIC_KEY = "BKPZDWxrNjFgvxA4jlTbqUEpUW5loNP2vPLJ13Rya72sQ7wBcOAeHgzpvx1ao_HUdhCVQhaERSPIDsoNxtWBHdQ";

  name: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;
  postDataReady: boolean;
  commentDataReady: boolean;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService,
    private swPush: SwPush,
    private newsLetterService: NewsLetterService) {
     
    this.postDataReady = false;
    this.commentDataReady = false;
    this.commentLength = 0;
    this.postLength = 0;
    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name)
      .subscribe(data => {
        this.postDataReady= true;
        this.postLength = data.length;
        this.posts = data;  
      }
    );
    this.commentService.getAllCommentsByUser(this.name)
      .subscribe(data => {
        this.commentDataReady = true;
        this.commentLength = data.length;
        this.comments = data;
      
      }
    );
  }

  ngOnInit(): void {
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
        console.log(sub);
        this.newsLetterService.addPushSubscriber(sub).subscribe()
    }).catch(err => console.error("Could not subscribe to notifications.",err));
  }

}
