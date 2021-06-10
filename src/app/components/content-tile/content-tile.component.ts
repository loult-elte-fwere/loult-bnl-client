import {Component, Input, OnInit} from '@angular/core';
import {FileData} from '../../api/models/file-data';
import {environment} from '../../../environments/environment';
import {RoleProvider} from '../../services/role-provider';
import {ClipboardService} from 'ngx-clipboard';
import {UsersService} from '../../api/services/users.service';

@Component({
  selector: 'bnl-content-tile',
  templateUrl: './content-tile.component.html',
  styleUrls: ['./content-tile.component.scss']
})
export class ContentTileComponent implements OnInit {
  @Input() fileData: FileData;
  // flag to indicate if the current user has archived this file
  userHasArchivedFile: boolean;

  constructor(public roleProvider: RoleProvider,
              private usersService: UsersService,
              private clipboard: ClipboardService) {
  }

  ngOnInit() {
    console.log("hasarchived" + this.fileData.archived_by.some(e => e.userid === this.roleProvider.userData.userid));
    this.userHasArchivedFile = this.fileData.archived_by.some(e => e.userid === this.roleProvider.userData.userid);
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
    console.log(this.userHasArchivedFile);
    if (this.userHasArchivedFile) {
      this.usersService.usersArchiveFileIdDelete({file_id: this.fileData.file_id}).subscribe(() => {
        this.userHasArchivedFile = false;
        this.roleProvider.userData.archived_files_count -= 1;
      });
    } else {
      this.usersService.usersArchiveFileIdPost({file_id: this.fileData.file_id}).subscribe(() => {
        this.userHasArchivedFile = true;
        this.roleProvider.userData.archived_files_count += 1;
      });
    }
  }

  archiveIcon() {
    return this.userHasArchivedFile ? 'assets/images/icons/unarchive.svg' : 'assets/images/icons/archive.svg';
  }

  archiveActionToolTip() {
    if (this.roleProvider.userData.permissions.can_archive) {
      return this.userHasArchivedFile ? 'Désarchiver ce document' : 'Archiver ce document';
    } else {
      return 'Vous ne pouvez pas archiver des documents';
    }
  }
}
