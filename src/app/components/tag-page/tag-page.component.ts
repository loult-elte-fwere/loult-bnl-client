import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserData} from '../../api/models/user-data';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../api/services/users.service';
import {Title} from '@angular/platform-browser';
import {ContentWallComponent} from '../content-wall/content-wall.component';
import {EventsService} from '../../services/events.service';

@Component({
  selector: 'bnl-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss']
})
export class TagPageComponent implements OnInit {
  public tagName: string;

  constructor(private route: ActivatedRoute,
              private eventsService: EventsService,
              private title: Title) {
  }

  ngOnInit() {
    this.tagName = this.route.snapshot.paramMap.get('tag_name');
    this.setTitle();
    this.route.params.subscribe(params => {
      this.tagName = params.tag_name;
      this.setTitle();
    });
  }

  setTitle() {
    this.title.setTitle(`BNL | 3615 ${this.tagName}`);
  }

}
