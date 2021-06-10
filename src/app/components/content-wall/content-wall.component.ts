import {Component, Input, OnInit} from '@angular/core';
import {FileData} from '../../api/models';
import {MediaService} from '../../api/services/media.service';

import {NgxMasonryOptions} from 'ngx-masonry';
import {EventsService} from '../../services/events.service';

const masonryOptions = {
  horizontalOrder: true,
  gutter: 20,
  originTop: true,
  // fitWidth: true
} as NgxMasonryOptions;

// TODO: "infinite" scroll https://stackoverflow.com/questions/40664766/how-to-detect-scroll-to-bottom-of-html-element

@Component({
  selector: 'bnl-homepage',
  templateUrl: './content-wall.component.html',
  styleUrls: ['./content-wall.component.scss']
})
export class ContentWallComponent implements OnInit {
  // used when displaying a user's page
  @Input() userId: string;
  filesList: FileData[];
  masonryOptions = masonryOptions;

  constructor(private mediaService: MediaService,
              private eventsService: EventsService) {
  }

  ngOnInit() {
    this.reloadData();
    this.eventsService.fileUploaded.subscribe(() => {
      this.reloadData();
    });
  }

  reloadData() {
    this.mediaService.mediaContentListLastUploadedGet().subscribe(
      data => {
        this.filesList = data;
      }
    );
  }

}
