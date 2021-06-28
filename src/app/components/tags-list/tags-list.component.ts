import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../api/services/users.service';

@Component({
  selector: 'bnl-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {
  tags: string[];

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.usersTagsListGet().subscribe((tags) => {
      this.tags = tags.tags;
    });
  }

}
