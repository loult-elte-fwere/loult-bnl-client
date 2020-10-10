import {Component, Input, OnInit} from '@angular/core';
import {FileData} from '../../api/models/file-data';

@Component({
  selector: 'bnl-content-tile',
  templateUrl: './content-tile.component.html',
  styleUrls: ['./content-tile.component.scss']
})
export class ContentTileComponent implements OnInit {
  @Input() fileData: FileData;
  constructor() { }

  ngOnInit() {
  }

}
