import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoleProvider} from '../../services/role-provider';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {UsersService} from '../../api/services/users.service';
import {FileMetaData} from '../../api/models/file-meta-data';

@Component({
  selector: 'bnl-submission-properties-editor',
  templateUrl: './submission-properties-editor.component.html',
  styleUrls: ['./submission-properties-editor.component.scss']
})
export class SubmissionPropertiesEditorComponent implements OnInit {
  @Input() contentMetadata: FileMetaData;
  @Output() contentMetadataChange = new EventEmitter<FileMetaData>();
  currentTag: string;
  allTags: string[];

  constructor(
    public roleProvider: RoleProvider,
    private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.contentMetadata.archive = this.roleProvider.userData.permissions.can_archive;
    this.usersService.usersTagsListGet().subscribe((data) => {
      this.allTags = data.tags;
      this.allTags = ['bite', 'couille', 'suce'];
    });
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.allTags.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  addTag() {
    this.contentMetadata.tags.push(this.currentTag);
    this.currentTag = '';
    this.contentMetadataChange.emit(this.contentMetadata);
  }

  deleteTag(tagIdx: number) {
    this.contentMetadata.tags.splice(tagIdx, 1);
    this.contentMetadataChange.emit(this.contentMetadata);
  }
}
