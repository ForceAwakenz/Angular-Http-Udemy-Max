import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  private baseUrl = 'https://workwithbackend-default-rtdb.europe-west1.firebasedatabase.app';
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createPost({ title, content}) {
    return this.http.post(this.baseUrl + '/posts.json',
      { title, content },
      { observe: 'response' }
    ).subscribe(
      responseData => console.log(responseData),
      error => this.error.next(error.message)
    )
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
        ),
        catchError(errorResponse => throwError(errorResponse))
      )
  }

  deletePosts() {
    return this.http.delete(this.baseUrl + '/posts.json');
  }


}
