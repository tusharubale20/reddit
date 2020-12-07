import { Component, OnInit } from '@angular/core';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { SubredditModel } from 'src/app/subreddit/post-model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.css']
})
export class SubredditSideBarComponent implements OnInit {

  displayViewAll: boolean;
  subreddits$: Array<SubredditModel> = [];

  constructor(private subredditService: SubredditService, private translate: TranslateService) { 
    this.loadSubreddits();
  }

  ngOnInit(): void {
  }

  private loadSubreddits() {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits$ = data
      if(this.subreddits$.length>=4) {
        this.subreddits$ = data.splice(0,3);
        this.displayViewAll = true;
      } 
    });
  }

}
