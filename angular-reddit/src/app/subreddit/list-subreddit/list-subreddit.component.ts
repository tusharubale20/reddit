import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../subreddit.service';
import { SubredditModel } from '../post-model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-subreddit',
  templateUrl: './list-subreddit.component.html',
  styleUrls: ['./list-subreddit.component.css']
})
export class ListSubredditComponent implements OnInit {

  subreddits$: Array<SubredditModel> = [];

  constructor(private subredditService: SubredditService, private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { 
    this.loadSubreddits();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .subscribe(params => {
      if( params.registered != undefined && params.registered === 'true') {
        this.toastr.success('Subreddit added successfully');
      }
    });
  }

  private loadSubreddits() {
    this.subredditService.getAllSubreddits().subscribe(data => {
        this.subreddits$ = data;
    }, (error) => {
      throwError(error);
    });
  }

}
