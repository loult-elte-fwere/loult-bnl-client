import { Component, OnInit } from '@angular/core';
import {RoleProvider} from '../../services/role-provider';
import {CookieStorageService} from '../../services/cookie-storage.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UploadModalComponent} from '../modals/upload-modal/upload-modal.component';
import {ConfigService} from '../../services/config.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {EventsService} from '../../services/events.service';
import {HelpModalComponent} from '../modals/help-modal/help-modal.component';

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
    private eventsService: EventsService,
    private modalService: NgbModal,
    public configService: ConfigService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(){
    this.cookieService.setCookie(this.cookie);
    this.roleProvider.login();
  }

  openUploadModal() {
    this.modalService.open(UploadModalComponent);
  }

  openHelpModal() {
    this.modalService.open(HelpModalComponent, { size: 'lg' });
  }

  logoClick() {
    if (this.router.url === '/last'){
      this.eventsService.refreshWall.emit();
    } else {
      this.router.navigate(['/last']);
    }
  }

  signalFilteringChange(){
    console.log(this.configService.fileQueryConfig);
    this.configService.storeQueryConfig();
    this.eventsService.refreshWall.emit();
  }


}
