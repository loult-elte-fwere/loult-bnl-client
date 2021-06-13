import {Component, Input, OnInit} from '@angular/core';
import {UserData} from '../../api/models/user-data';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../api/services/users.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'bnl-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss']
})
export class TagPageComponent implements OnInit {
  @Input() tagName: string;

  constructor(private route: ActivatedRoute,
              private title: Title) {
  }

  ngOnInit() {
    this.setTitle();
    this.route.params.subscribe(params => {
      this.tagName = params.tag_name;
      this.setTitle();
    });
  }

  setTitle() {
    this.title.setTitle(`BNL | 3615 ${this.tagName}`);
  }

}
