import { PostDataService } from './post-data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(
    private http: HttpClient,
    private postDataService: PostDataService) { }

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    console.log(postData);
  }
  
  onFetchPosts() {
    // Send Http request
    this.postDataService.fetchPosts().subscribe(console.log);
  }

  onClearPosts() {
    // Send Http request
  }
}
