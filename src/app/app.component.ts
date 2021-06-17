import {Component} from '@angular/core';
import {EventsService} from './services/events.service';

@Component({
  selector: 'bnl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'loult-bnl-client';

  constructor() {
  }
}
