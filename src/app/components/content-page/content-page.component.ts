import {Component} from '@angular/core';
import {RoleProvider} from '../../services/role-provider';
import {MediaService} from '../../api/services/media.service';
import {UsersService} from '../../api/services/users.service';
import {ClipboardService} from 'ngx-clipboard';
import {ContentTileComponent} from '../content-tile/content-tile.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditModalComponent} from '../edit-modal/edit-modal.component';
import {FileMetaData} from '../../api/models/file-meta-data';
import {EventsService} from '../../services/events.service';
import {BaseContentComponent} from '../base-content-component';
import {ConfigService} from '../../services/config.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'bnl-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent extends BaseContentComponent {

  constructor(public roleProvider: RoleProvider,
              public mediaService: MediaService,
              public usersService: UsersService,
              public clipboard: ClipboardService,
              public eventService: EventsService,
              public modalService: NgbModal,
              public configService: ConfigService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) {
    super(roleProvider, mediaService, usersService, clipboard, eventService, modalService, configService);
  }

  ngOnInit() {
    const fileId: string = this.route.snapshot.paramMap.get('file_id');
    this.mediaService.mediaContentDataFileIdGet({file_id: fileId}).subscribe(data => {
      this.fileData = data;
      this.setTitle();
      super.ngOnInit();
    });
  }

  setTitle() {
    this.title.setTitle(`BNL | Archive n° ${this.fileData.file_id}`);
  }

  postDeleteAction() {
    this.router.navigate(['/last']);
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
    const modalRef = this.modalService.open(EditModalComponent);
    const tagsList = this.fileData.tags.map(tagData => tagData.name);
    modalRef.componentInstance.contentMetadata = {title: this.fileData.title, tags: tagsList} as FileMetaData;
    modalRef.componentInstance.fileData = this.fileData;
    modalRef.result.then(value => {
      if (value){
        this.reloadFileData();
      }
    });
  }
}
