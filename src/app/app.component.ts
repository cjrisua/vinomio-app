import { Component } from '@angular/core';
/*import { HttpClient } from '@angular/common/http';*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vinomio-app';

  /*
  constructor(private http: HttpClient) {}

  localError() {
    throw Error('The app component has thrown an error!');
  }

  failingRequest() {
    this.http.get('https://httpstat.us/404?sleep=2000').toPromise();
  }

  successfulRequest() {
    this.http.get('https://httpstat.us/200?sleep=2000').toPromise();
  }*/
}
