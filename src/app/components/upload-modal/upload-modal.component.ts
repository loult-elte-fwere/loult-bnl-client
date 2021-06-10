import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MediaService} from '../../api/services/media.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {EventsService} from '../../services/events.service';
import {RoleProvider} from '../../services/role-provider';
import {FileMetaData} from '../../api/models/file-meta-data';
import {ToastService} from '../../services/toast.service';

// todo: add ctrl v upload https://stackoverflow.com/questions/49920652/detect-ctrl-c-and-ctrl-v-in-an-input-from-browsers
@Component({
  selector: 'bnl-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements OnInit {
  selectedFile: File;
  fileUrl: SafeUrl;
  fileBase64: string;
  fileUploaded = false;
  uploading = false;
  fileMetadata: FileMetaData = {title: '', archive: false, tags: []};

  constructor(public activeModal: NgbActiveModal,
              private mediaService: MediaService,
              private sanitizer: DomSanitizer,
              private toastService: ToastService,
              private eventsService: EventsService) {

  }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileUploaded = false;
    this.selectedFile = files.item(0);
    const unsafeImageUrl = URL.createObjectURL(this.selectedFile);
    this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
  }

  loadFile() {
    const uploadedFile: Blob = this.selectedFile;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedFile);
    fileReader.onload = () => {
      this.fileBase64 = (fileReader.result as string);
      this.sendFile();
    };
    fileReader.onerror = error => {
      console.log('Error: ', error);
    };
  }

  sendFile() {
    this.uploading = true;
    this.mediaService.mediaUploadJsonPost({body: {payload: this.fileBase64, metadata: this.fileMetadata}}
    ).subscribe(() => {
      this.fileUploaded = true;
      this.selectedFile = undefined;
      this.fileUrl = undefined;
      this.uploading = false;
      this.eventsService.fileUploaded.emit();
    }, error => {
      console.log(error);
      this.uploading = false;
      this.toastService.show('Erreur à l\'upload ', {classname: 'bg-danger text-light', delay: 15000});
    });
  }

}
