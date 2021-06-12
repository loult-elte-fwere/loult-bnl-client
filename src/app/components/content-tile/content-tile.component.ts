import {Component, Input, OnInit} from '@angular/core';
import {FileData} from '../../api/models/file-data';
import {BaseContentComponent} from '../base-content-component';

@Component({
  selector: 'bnl-content-tile',
  templateUrl: './content-tile.component.html',
  styleUrls: ['./content-tile.component.scss']
})
export class ContentTileComponent extends BaseContentComponent implements OnInit {
  @Input() fileData: FileData;


  deleteContent() {
    this.mediaService.mediaContentDeleteFileIdDelete({file_id: this.fileData.file_id}).subscribe(() => {
      this.fileData = undefined;
    });
  }
}
