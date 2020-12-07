import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreatePostPayload } from './create-post.payload';
import { SubredditModel } from 'src/app/subreddit/post-model';
import { PostService } from 'src/app/shared/post.service';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits$: Array<SubredditModel>;

  constructor(private router: Router, private postService: PostService,
    private subredditService: SubredditService) { 
      this.postPayload = {
        postName: '',
        subredditName: '',
        url: '',
        description: ''
      }
    }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    this.subredditService.getAllSubreddits().
      subscribe((data) => {
        this.subreddits$ = data;
      }, (error) => {
        throwError(error);
      });
  }

  createPost() {
    this.postPayload.subredditName = this.postForm.get('subredditName').value;
    this.postPayload.postName = this.postForm.get('postName').value;
    this.postPayload.description = this.postForm.get('description').value;
    this.postPayload.url = this.postForm.get('url').value;

    this.postService.createPost(this.postPayload)
      .subscribe((data) => {
        this.router.navigateByUrl('/');
      }, (error) => {
        throwError(error);
      });
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}
