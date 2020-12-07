import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { PostModel } from '../shared/post-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts$ : PostModel[];
  dataReady: boolean;

  constructor(private postService: PostService) { 
    this.loadPosts();
  }

  ngOnInit(): void {
    this.dataReady = false;
  }

  private loadPosts() {
    this.postService.getAllPosts().subscribe(post => {
      this.posts$ = post;
      this.dataReady = true;
    });
  }

}
