import {Component, OnInit} from '@angular/core';
import {FileData} from '../../api/models';
import {MediaService} from '../../api/services/media.service';

import { NgxMasonryOptions } from 'ngx-masonry';

const masonryOptions = {
  horizontalOrder: true,
  columnWidth: 150,
  originTop: true
} as NgxMasonryOptions;

@Component({
  selector: 'bnl-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  filesList: FileData[];
  masonryOptions = masonryOptions;

  constructor(private mediaService: MediaService) {
  }

  ngOnInit() {
    this.mediaService.mediaContentListLastUploadedGet().subscribe(
      data => {
        this.filesList = data;
      }
    );
  }

}
