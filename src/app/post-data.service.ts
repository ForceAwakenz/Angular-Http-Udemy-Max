import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  private baseUrl = 'https://workwithbackend-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) { }

  fetchPosts() {
    return this.http.get(
      ''.concat(this.baseUrl, '/posts.json')
    )
      .pipe(
        map(responseObj => {
          return Object.keys(responseObj)
          .reduce(
            (acc, curr) => acc = acc.concat(
              { ...responseObj[curr], id: curr}
            ), []
          )}
        )
      )
  }


}
