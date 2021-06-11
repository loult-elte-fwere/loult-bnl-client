import {Component, OnInit} from '@angular/core';
import {FileData} from '../api/models/file-data';
import {RoleProvider} from '../services/role-provider';
import {MediaService} from '../api/services/media.service';
import {UsersService} from '../api/services/users.service';
import {ClipboardService} from 'ngx-clipboard';
import {environment} from '../../environments/environment';

@Component({
  selector: 'bnl-base-content',
  template: `
        <div>
            base works!!
        </div>
    `
})
export abstract class BaseContentComponent implements OnInit {
  fileData: FileData;
  // flag to indicate if the current user has archived this file
  userHasArchivedFile: boolean;

  constructor(public roleProvider: RoleProvider,
              public mediaService: MediaService,
              public usersService: UsersService,
              public clipboard: ClipboardService,) {
  }

  ngOnInit() {
    if (!this.roleProvider.isLogged()) {
      this.userHasArchivedFile = false;
      return;
    }
    this.userHasArchivedFile = this.fileData.archived_by.some(e => e.userid === this.roleProvider.userData.userid);
  }

  reloadFileData() {
    this.mediaService.mediaContentDataFileIdGet({file_id: this.fileData.file_id}).subscribe(data => {
        this.fileData = data;
      }
    );
  }

  miniatureLink() {
    return environment.api_root + '/media/content/image/miniature/' + this.fileData.file_id;
  }

  imgLink() {
    return environment.api_root + '/media/content/image/' + this.fileData.file_id;
  }

  audioLink() {
    return environment.api_root + '/media/content/audio/' + this.fileData.file_id;
  }

  copyLink() {
    const link = this.fileData.file_type === 'audio' ? this.audioLink() : this.imgLink();
    this.clipboard.copy(link);
  }


  archiveToggle() {
    if (this.userHasArchivedFile) {
      this.usersService.usersArchiveFileIdDelete({file_id: this.fileData.file_id}).subscribe(() => {
        this.userHasArchivedFile = false;
        this.roleProvider.userData.archived_files_count -= 1;
        this.reloadFileData();
      });
    } else {
      this.usersService.usersArchiveFileIdPost({file_id: this.fileData.file_id}).subscribe(() => {
        this.userHasArchivedFile = true;
        this.roleProvider.userData.archived_files_count += 1;
        this.reloadFileData();
      });
    }
  }

  archiveIcon() {
    return this.userHasArchivedFile ? 'assets/images/icons/unarchive.svg' : 'assets/images/icons/archive.svg';
  }

  archiveActionToolTip() {
    if (this.roleProvider.isLogged() && this.roleProvider.userData.permissions.can_archive) {
      return this.userHasArchivedFile ? 'Désarchiver ce document' : 'Archiver ce document';
    } else {
      return 'Vous ne pouvez pas archiver des documents';
    }
  }

  abstract deleteContent(): void;
}
