import { PostDataService } from './post-data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private postDataService: PostDataService) { }

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
    this.postDataService.createPost(postData).subscribe(console.log);
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
}
