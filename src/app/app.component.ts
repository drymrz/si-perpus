import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLog: boolean = false;

  constructor() {}

  hasLog() {
    this.isLog = true;
  }
}
