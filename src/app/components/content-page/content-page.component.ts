import {Component} from '@angular/core';
import {RoleProvider} from '../../services/role-provider';
import {MediaService} from '../../api/services/media.service';
import {UsersService} from '../../api/services/users.service';
import {ClipboardService} from 'ngx-clipboard';
import {ContentTileComponent} from '../content-tile/content-tile.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'bnl-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent extends ContentTileComponent {

  constructor(public roleProvider: RoleProvider,
              public mediaService: MediaService,
              public usersService: UsersService,
              public clipboard: ClipboardService,
              public route: ActivatedRoute,
              public router: Router) {
    super(roleProvider, mediaService, usersService, clipboard);
  }

  ngOnInit() {
    const fileId: string = this.route.snapshot.paramMap.get('file_id');
    this.mediaService.mediaContentDataFileIdGet({file_id: fileId}).subscribe(data => {
      this.fileData = data;
      super.ngOnInit();
    });
  }

  deleteContent() {
    this.mediaService.mediaContentDeleteFileIdDelete({file_id: this.fileData.file_id}).subscribe(() => {
      this.router.navigate(['/last']);
    });
  }

  fileCanBeEdited() {
    if (!this.roleProvider.isLogged()) {
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

  }
}
