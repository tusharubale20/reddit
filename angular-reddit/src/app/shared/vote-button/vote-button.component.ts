import { Component, OnInit, Input } from '@angular/core';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';
import { VotePayload } from './vote-payload';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { VoteType } from './vote-type';
import { VoteService } from '../vote.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  votePayload: VotePayload;

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  constructor(private voteService: VoteService,
    private postService: PostService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {

    this.votePayload = {
      voteType : undefined,
      postId: undefined
    };
  }

  ngOnInit(): void {
  }

  upVote() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downVote() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload)
      .subscribe(() => {
        this.updateVoteDetails();
      }, error => {
        if(error.status === 400) {
          console.log('Already voted')
          this.toastr.error(error.error.error);
        } else if(error.error.status === 403) {
          console.log('Please login')
          this.toastr.error('To vote a post, you need to login.');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error('Something went wrong. Please relogin and try again. If the issue persists, contact Admin(Tushar).');
          this.router.navigateByUrl('/login');
        }
      })
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe( data => {
      this.post = data;
    });
  }

}
