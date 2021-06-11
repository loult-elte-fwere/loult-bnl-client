import {Component, Input, OnInit} from '@angular/core';
import {UserData} from '../../api/models/user-data';
import {ActivatedRoute} from '@angular/router';
import {UsersService} from '../../api/services/users.service';

@Component({
  selector: 'bnl-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss']
})
export class TagPageComponent implements OnInit {
  @Input() tagName: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tagName = params.tag_name;
    });
  }

}
