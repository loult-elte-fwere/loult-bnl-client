import {Component, OnInit} from '@angular/core';
import {FileData} from '../../api/models';
import {MediaService} from '../../api/services/media.service';

@Component({
  selector: 'bnl-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  filesList: FileData[];

  constructor(private mediaService: MediaService) {
  }

  ngOnInit() {
    this.mediaService.mediaContentListLastUploadedGet().subscribe(
      data => {
        this.filesList = data;
      }
    );
  }

}
