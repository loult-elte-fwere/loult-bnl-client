import {Injectable} from '@angular/core';
import {MediaFileQuery} from '../api/models/media-file-query';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public deleteSafeMode = true;
  public fileQueryConfig = {
    query_audio: true,
    query_images: true,
    query_archived: true,
    query_not_archived: true,
    sort_type: 'descending'
  } as MediaFileQuery;

  constructor() {
    const queryConfig = window.localStorage.getItem('fileQueryConfig');
    if (queryConfig !== null) {
      this.fileQueryConfig = JSON.parse(queryConfig) as MediaFileQuery;
    }
  }

  public storeQueryConfig() {
    window.localStorage.setItem('fileQueryConfig', JSON.stringify(this.fileQueryConfig));
  }
}
