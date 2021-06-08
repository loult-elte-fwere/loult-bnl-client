import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MediaService} from '../../api/services/media.service';

@Component({
  selector: 'bnl-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {
  selectedFile: File;

  constructor(public activeModal: NgbActiveModal,
              private mediaService: MediaService) {

  }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    console.log(files);
    this.selectedFile = files.item(0);
  }

  uploadFile() {
    console.log(this.selectedFile);
    const uploadedFile: Blob = this.selectedFile;
    const formData: FormData = new FormData();
    formData.append('file', uploadedFile);
    this.mediaService.mediaUploadMultipartPost({body: {file: uploadedFile}}).subscribe( () => {

    });
  }

}
