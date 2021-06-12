import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {RoleProvider} from '../../services/role-provider';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {FileMetaData} from '../../api/models/file-meta-data';
import {UsersService} from '../../api/services/users.service';
import {FileData} from '../../api/models/file-data';

@Component({
  selector: 'bnl-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  @Input() fileData: FileData;
  contentMetadata: FileMetaData;
  currentTag: string;
  allTags: string[] = [];


  constructor(public activeModal: NgbActiveModal,
              public usersService: UsersService,
              public roleProvider: RoleProvider) {
  }

  ngOnInit(): void {
    const tagsList = this.fileData.tags.map(tagData => tagData.name);
    this.contentMetadata = {title: this.fileData.title, tags: tagsList} as FileMetaData;

    this.usersService.usersTagsListGet().subscribe((data) => {
      this.allTags = data.tags;
    });
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.allTags.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  userCanEditTitle() {
    return ((this.fileData.uploaded_by.userid === this.roleProvider.userData.userid)
      || (this.fileData.archivist.userid === this.roleProvider.userData.userid
        && this.roleProvider.userData.permissions.can_edit_archived)
      || (this.roleProvider.userData.permissions.can_edit_others));
  }

  userCanEditTags() {
    return ((this.fileData.uploaded_by.userid === this.roleProvider.userData.userid
      && this.roleProvider.userData.permissions.can_tag)
    || (this.fileData.archivist.userid === this.roleProvider.userData.userid
      && this.roleProvider.userData.permissions.can_edit_archived)
    || (this.roleProvider.userData.permissions.can_edit_others));
  }

  addTag() {
    this.contentMetadata.tags.push(this.currentTag);
    this.currentTag = '';
  }

  deleteTag(tagIdx: number) {
    this.contentMetadata.tags.splice(tagIdx, 1);
  }

  saveData() {
    this.usersService.usersMetadataEditFileIdPatch(
      {file_id: this.fileData.file_id, body: this.contentMetadata}).subscribe(() => {
      this.activeModal.close(true);
    });
  }

}
