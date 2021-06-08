import { Component, OnInit } from '@angular/core';
import {RoleProvider} from '../../services/role-provider';
import {CookieStorageService} from '../../services/cookie-storage.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UploadModalComponent} from '../upload-modal/upload-modal.component';

@Component({
  selector: 'bnl-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  cookie: string;

  constructor(
    public roleProvider: RoleProvider,
    private cookieService: CookieStorageService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  login(){
    this.cookieService.setCookie(this.cookie);
    this.roleProvider.login();
  }

  openUploadModal() {
    const modalRef = this.modalService.open(UploadModalComponent);
  }


}
