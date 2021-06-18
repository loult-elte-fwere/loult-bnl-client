import {EventEmitter, Injectable} from '@angular/core';
import {UserData} from '../api/models/user-data';
import {FileData} from '../api/models/file-data';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  public userLogin: EventEmitter<UserData> = new EventEmitter<UserData>();
  public userLogout: EventEmitter<void> = new EventEmitter();
  public fileUploaded: EventEmitter<FileData> = new EventEmitter<FileData>();
  public refreshWall: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }
}
