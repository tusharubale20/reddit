import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateSubredditRequest } from './create-subreddit-request';
import { SubredditService } from '../subreddit.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  subredditForm: FormGroup;
  createSubredditRequest: CreateSubredditRequest;

  constructor(private subredditService: SubredditService, private router: Router) {
    this.createSubredditRequest = {
      name : '',
      description : ''
    }
   }

  ngOnInit(): void {
    this.subredditForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  createSubreddit() {
    this.createSubredditRequest.name = this.subredditForm.get('name').value;
    this.createSubredditRequest.description = this.subredditForm.get('description').value;

    this.subredditService.createSubreddit(this.createSubredditRequest)
      .subscribe((data) => {
        this.router.navigate(['/list-subreddits'],
          {queryParams: {subredditAdded: 'true'} });
      },(error) => {
        throwError(error);
      })
  }

}
