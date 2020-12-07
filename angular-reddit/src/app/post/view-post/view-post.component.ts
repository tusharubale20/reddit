import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/shared/post-model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from './comment.payload';
import { CommentService } from './comment.service';
import { ToastrService } from 'ngx-toastr';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  faExternalLinkAlt= faExternalLinkAlt;
  postId: number;
  post$: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload; 
  comments: Array<CommentPayload> = []
  
  constructor(private postService: PostService ,private activateRoute: ActivatedRoute,
      private commentService: CommentService,
      private toastr: ToastrService,
      private router: Router) {
    
    this.postId = this.activateRoute.snapshot.params.id;
    this.loadPost(this.postId);

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.minLength(2)])
    });

    this.commentPayload = {
      text: '',
      postId: this.postId
    }
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  loadPost(postId: number) {
    this.postService.getPost(postId)
      .subscribe((data) => {
        this.post$ = data;
      }, (error) => {
        throwError(error);
      }
    );
  }

  getPostById() {
    this.postService.getPost(this.postId)
      .subscribe((data) => {
        this.post$ = data;
      }, (error) => {
        throwError(error);
      }
    );
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload)
      .subscribe( data => {
        this.commentForm.get('text').setValue('');
        this.getCommentsForPost();
      }, error => {
        if(error.error.status === 403) {
          this.toastr.error('To post a comment, you need to login.');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error('Something went wrong. Please relogin and try again. If the issue persists, contact Admin(Tushar).');
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId)
      .subscribe((data) => {
        this.comments = data;
      }, (error) => {
        throwError(error);
      }
    );
  }

}
