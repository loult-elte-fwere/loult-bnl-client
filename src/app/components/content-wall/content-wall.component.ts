import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FileData, MediaFileQuery, UserLibraryFilters} from '../../api/models';
import {MediaService} from '../../api/services/media.service';

import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry';
import {EventsService} from '../../services/events.service';
import {UsersService} from '../../api/services/users.service';
import {Observable} from 'rxjs';
import {Title} from '@angular/platform-browser';
import {PaginationService} from '../../services/pagination.service';
import {environment} from '../../../environments/environment';
import {NavigationEnd, Router} from '@angular/router';
import {ConfigService} from '../../services/config.service';

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
  // used when displaying a user's page or a tag page
  @Input() userId: string;
  @Input() userFilters: UserLibraryFilters;
  @Input() tagName: string;

  filesList: FileData[];
  masonryOptions = masonryOptions;
  loadingData = false;
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  constructor(private mediaService: MediaService,
              private usersService: UsersService,
              private eventsService: EventsService,
              private paginationService: PaginationService,
              private configService: ConfigService,
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
    this.eventsService.refreshWall.subscribe(() => {
      console.log('Refreshed layout');
      this.masonry.layout();
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
    this.configService.fileQueryConfig.max_creation_time = new Date().toISOString();
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
        body: {
          base_query: this.configService.fileQueryConfig,
          users_filters: this.userFilters
        }
      });
    } else if (this.tagName) {
      promise = this.mediaService.mediaContentListTagTagNamePost({
        tag_name: this.tagName,
        page: this.paginationService.currentPage,
        page_size: pageSize,
        body: this.configService.fileQueryConfig,
      });
    } else {
      promise = this.mediaService.mediaContentListLastUploadedPost({
        page: this.paginationService.currentPage,
        page_size: pageSize,
        body: this.configService.fileQueryConfig
      });
    }
    this.loadingData = true;
    promise.subscribe(data => {
      this.loadingData = false;
      this.filesList = this.filesList.concat(data);
      this.paginationService.currentPage += 1;
    });
  }

}
