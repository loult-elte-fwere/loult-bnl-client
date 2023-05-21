import {Component, Input, OnInit} from '@angular/core';
import {FileData} from '../../api/models/file-data';
import {BaseContentComponent} from '../base-content-component';

// TODO: add the metadata edit modal opener in the tile
@Component({
  selector: 'bnl-content-tile',
  templateUrl: './content-tile.component.html',
  styleUrls: ['./content-tile.component.scss']
})
export class ContentTileComponent extends BaseContentComponent implements OnInit {
  @Input() fileData: FileData;

  ngOnInit() {
    super.ngOnInit();
    this.reloadHasArchived();
  }

  postDeleteAction() {
    this.fileData = undefined;
  }

  archiveToggle() {
    super.archiveToggle();
    this.eventsService.refreshWall.emit();
  }
}
