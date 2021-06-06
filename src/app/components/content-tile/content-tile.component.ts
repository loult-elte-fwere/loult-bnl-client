import {Component, Input, OnInit} from '@angular/core';
import {FileData} from '../../api/models/file-data';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'bnl-content-tile',
  templateUrl: './content-tile.component.html',
  styleUrls: ['./content-tile.component.scss']
})
export class ContentTileComponent implements OnInit {
  @Input() fileData: FileData;

  constructor() {
  }

  ngOnInit() {
  }

  miniatureLink() {
    return environment.api_root + '/media/content/image/miniature/' + this.fileData.file_id;
  }

  audioLink() {
    return environment.api_root + '/media/content/audio/' + this.fileData.file_id;
  }
}
