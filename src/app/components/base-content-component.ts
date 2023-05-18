import {Component, OnInit} from '@angular/core';
import {FileData} from '../api/models/file-data';
import {RoleProvider} from '../services/role-provider';
import {MediaService} from '../api/services/media.service';
import {UsersService} from '../api/services/users.service';
import {ClipboardService} from 'ngx-clipboard';
import {environment} from '../../environments/environment';
import {EventsService} from '../services/events.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfigService} from '../services/config.service';
import {ConfirmationModalComponent} from './modals/confirmation-modal/confirmation-modal.component';
import {EditModalComponent} from './modals/edit-modal/edit-modal.component';
import {FileMetaData} from '../api/models/file-meta-data';

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
              public clipboard: ClipboardService,
              public eventsService: EventsService,
              public modalService: NgbModal,
              public configService: ConfigService) {
  }

  ngOnInit() {
    this.eventsService.userLogout.subscribe(() => this.reloadHasArchived());
    this.eventsService.userLogin.subscribe(() => this.reloadHasArchived());
  }

  reloadHasArchived() {
    if (!this.roleProvider.isLoggedIn()) {
      this.userHasArchivedFile = false;
      return;
    } else {
      this.userHasArchivedFile = this.fileData.archived_by.some(e => e.userid === this.roleProvider.userData.userid);
    }
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

  mediaLink() {
    return `${environment.api_root}/media/content/${this.fileData.file_type}/${this.fileData.file_id}`;
  }

  copyLink() {
    this.clipboard.copy(this.mediaLink());
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
    return this.userHasArchivedFile ? 'assets/images/icons/star-2.svg' : 'assets/images/icons/star-1.svg';
  }

  canArchive() {
    if (this.roleProvider.isLoggedIn()) {
      if (this.fileData.file_type === 'video' && !this.roleProvider.userData.permissions.can_archive_videos) {
        return false;
      }
      return this.roleProvider.userData.permissions.can_archive;

    }
  }

  archiveActionToolTip() {
    if (this.canArchive()) {
      return this.userHasArchivedFile ? 'Désarchiver ce document' : 'Archiver ce document';
    } else {
      return 'Vous ne pouvez pas archiver ce documents';
    }
  }

  deleteContent() {
    if (this.configService.deleteSafeMode) {
      const modalRef = this.modalService.open(ConfirmationModalComponent);
      modalRef.result.then(value => {
        if (value) {
          this.mediaService.mediaContentDeleteFileIdDelete({file_id: this.fileData.file_id}).subscribe(() => {
            this.postDeleteAction();
          });
        }
      });
    } else {
      this.mediaService.mediaContentDeleteFileIdDelete({file_id: this.fileData.file_id}).subscribe(() => {
        this.postDeleteAction();
      });
    }

  }

  fileCanBeEdited() {
    if (!this.roleProvider.isLoggedIn()) {
      return false;
    }
    const currentUserId = this.roleProvider.userData.userid;
    if (this.fileData.uploaded_by.userid === currentUserId) {
      return true;
    }
    if ((this.fileData.archivist && this.fileData.archivist.userid === currentUserId)
      && this.roleProvider.userData.permissions.can_edit_archived) {
      return true;
    }
    if (this.roleProvider.userData.permissions.can_edit_others) {
      return true;
    }

    return false;
  }

  editContent() {
    const modalRef = this.modalService.open(EditModalComponent);
    const tagsList = this.fileData.tags.map(tagData => tagData.name);
    modalRef.componentInstance.contentMetadata = {title: this.fileData.title, tags: tagsList} as FileMetaData;
    modalRef.componentInstance.fileData = this.fileData;
    modalRef.result.then(value => {
      if (value) {
        this.reloadFileData();
      }
    });
  }

  abstract postDeleteAction(): void;

}
