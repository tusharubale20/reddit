import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../post-model';
import { faCommentAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  @Input() posts : PostModel[];
  faCommentAlt = faCommentAlt;
  faExternalLinkAlt = faExternalLinkAlt;

  constructor(private router: Router, public translate: TranslateService) { }

  ngOnInit(): void {
  }

  viewPost(id: number) {
    this.router.navigateByUrl(`/view-post/${id}`);
  }

}
