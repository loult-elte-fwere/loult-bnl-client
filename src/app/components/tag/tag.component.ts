import {Component, Input, OnInit} from '@angular/core';
import {UserData} from '../../api/models/user-data';
import {TagData} from '../../api/models/tag-data';

@Component({
  selector: 'bnl-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tagData?: TagData;
  @Input() tagName?: string;
  constructor() { }

  ngOnInit(): void {
  }

  getTagName(){
    return this.tagData ? this.tagData.name : this.tagName
  }

}
