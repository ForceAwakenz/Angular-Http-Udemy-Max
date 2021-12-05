import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  private baseUrl = 'https://workwithbackend-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) { }

  createPost({ title, content}) {
    return this.http.post(this.baseUrl + '/posts.json',
      { title, content });
  }

  fetchPosts() {
    return this.http.get(
      ''.concat(this.baseUrl, '/posts.json'),
      {
        headers: new HttpHeaders({ ninja: 'yes' }),
        params: new HttpParams().append('print', 'pretty')
      }
    )
      .pipe(
        map(responseObj => {
          return Object.keys(responseObj)
          .reduce(
            (acc, curr) => acc.concat(
              { ...responseObj[curr], id: curr}
            ), []
          )}
        )
      )
  }

  deletePosts() {
    return this.http.delete(this.baseUrl + '/posts.json');
  }


}
