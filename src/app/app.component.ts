import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-jest-mutator';

  sum(a: number, b: number) {
    return a + b;
  }

  gt(a: number) {
    return (b: number) => a > b;
  }

}
