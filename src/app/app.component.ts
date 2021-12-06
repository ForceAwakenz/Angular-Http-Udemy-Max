import { PostDataService } from './post-data.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  private errorSub: Subscription;

  constructor(private postDataService: PostDataService) { }

  ngOnInit() {
    this.postDataService.fetchPosts().subscribe(posts => this.loadedPosts = posts);
    this.errorSub = this.postDataService.error.subscribe(console.log);
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request

    this.postDataService.createPost(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.postDataService.fetchPosts().subscribe(posts => {
      this.loadedPosts = posts
      console.log(posts);
    },
      (err: HttpErrorResponse) => {
        console.warn(err)
      });
  }

  onClearPosts() {
    // Send Http request
    if (!this.loadedPosts.length) return;
    this.postDataService.deletePosts().subscribe(console.log);
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
