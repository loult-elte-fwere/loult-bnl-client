import {Injectable} from '@angular/core';
import {MediaFileQuery} from '../api/models/media-file-query';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public deleteSafeMode = true;
  public fileQueryConfig = {
    query_archived: true,
    query_not_archived: true,
    query_media_type: 'all',
    sort_type: 'descending'
  } as MediaFileQuery;

  constructor() {
    const queryConfig = window.localStorage.getItem('fileQueryConfig');
    if (queryConfig !== null) {
      const config = JSON.parse(queryConfig);
      // this condition is added to prevent legacy loading of the former query format
      if (!('query_audio' in config)) {
        this.fileQueryConfig = config as MediaFileQuery;
      }
    }
  }

  public storeQueryConfig() {
    window.localStorage.setItem('fileQueryConfig', JSON.stringify(this.fileQueryConfig));
  }
}
