import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FileData, MediaFileQuery} from '../../api/models';
import {MediaService} from '../../api/services/media.service';

import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry';
import {EventsService} from '../../services/events.service';
import {UsersService} from '../../api/services/users.service';
import {Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {PaginationService} from '../../services/pagination.service';
import {environment} from '../../../environments/environment';
import {NavigationEnd, Router} from '@angular/router';

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
export class ContentWallComponent implements OnInit, OnChanges {
  // used when displaying a user's page
  @Input() userId: string;
  @Input() tagName: string;

  filesList: FileData[];
  masonryOptions = masonryOptions;
  mediaFileQuery: MediaFileQuery;
  loadingData = false;
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  constructor(private mediaService: MediaService,
              private usersService: UsersService,
              private eventsService: EventsService,
              private paginationService: PaginationService,
              private router: Router,
              private title: Title) {
  }

  ngOnInit() {
    this.reset();

    this.loadData();
    this.eventsService.fileUploaded.subscribe((data) => {
      this.filesList.unshift(data);
      this.masonry.reloadItems();
      this.masonry.layout();
    });
    if (!this.userId && !this.tagName) {
      this.title.setTitle('BNL | Dernières archives');
    }
    this.eventsService.refreshWall.subscribe(() => {
      this.reset();
      this.loadData();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.userId && !changes.tagName.previousValue) {
      return;
    } else if (!this.tagName && !changes.userId.previousValue) {
      return;
    }
    this.reset();
    this.loadData();
  }

  reset() {
    console.log('resetted!');
    this.paginationService.reset();
    this.mediaFileQuery = {
      max_creation_time: new Date().toISOString()
    } as MediaFileQuery;
    this.filesList = [];

  }

  loadData() {
    let promise: Observable<FileData[]>;
    const pageSize = environment.elements_per_page;
    if (this.userId) {
      promise = this.usersService.usersLibraryListUserIdPost({
        user_id: this.userId,
        page: this.paginationService.currentPage,
        page_size: pageSize,
        body: this.mediaFileQuery
      });
    } else if (this.tagName) {
      promise = this.mediaService.mediaContentListTagTagNamePost({
        tag_name: this.tagName,
        page: this.paginationService.currentPage,
        page_size: pageSize,
        body: this.mediaFileQuery
      });
    } else {
      promise = this.mediaService.mediaContentListLastUploadedPost({
        page: this.paginationService.currentPage,
        page_size: pageSize,
        body: this.mediaFileQuery
      });
    }
    this.loadingData = true;
    promise.subscribe(data => {
      this.loadingData = false;
      this.filesList = this.filesList.concat(data);
      this.paginationService.currentPage++;
    });
  }

}
