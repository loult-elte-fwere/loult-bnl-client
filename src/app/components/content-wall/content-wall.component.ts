import {Component, Input, OnInit} from '@angular/core';
import {FileData} from '../../api/models';
import {MediaService} from '../../api/services/media.service';

import {NgxMasonryOptions} from 'ngx-masonry';
import {EventsService} from '../../services/events.service';
import {UsersService} from '../../api/services/users.service';
import {Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';

const masonryOptions = {
  horizontalOrder: true,
  gutter: 20,
  originTop: true,
  // fitWidth: true
} as NgxMasonryOptions;

// TODO: "infinite" scroll https://stackoverflow.com/questions/40664766/how-to-detect-scroll-to-bottom-of-html-element

@Component({
  selector: 'bnl-content-wall',
  templateUrl: './content-wall.component.html',
  styleUrls: ['./content-wall.component.scss']
})
export class ContentWallComponent implements OnInit {
  // used when displaying a user's page
  @Input() userId: string;
  @Input() tagName: string;

  filesList: FileData[];
  masonryOptions = masonryOptions;

  constructor(private mediaService: MediaService,
              private usersService: UsersService,
              private eventsService: EventsService,
              private title: Title) {
  }

  ngOnInit() {
    this.reloadData();
    this.eventsService.fileUploaded.subscribe(() => {
      this.reloadData();
    });
    if (!this.userId && !this.tagName) {
      this.title.setTitle('BNL | Dernières archives');
    }
  }

  reloadData() {
    let promise: Observable<FileData[]>;
    if (this.userId) {
      promise = this.usersService.usersLibraryListUserIdGet({user_id: this.userId});
    } else if (this.tagName) {
      promise = this.mediaService.mediaContentListTagTagNameGet({tag_name: this.tagName});
    } else {
      promise = this.mediaService.mediaContentListLastUploadedGet();
    }
    promise.subscribe(data => {
      this.filesList = data;
    });
  }

}
