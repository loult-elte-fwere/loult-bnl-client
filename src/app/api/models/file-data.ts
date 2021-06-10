/* tslint:disable */
/* eslint-disable */
import { TagData } from './tag-data';
import { UserData } from './user-data';
export interface FileData {
  archived_by?: Array<UserData>;
  archivist?: UserData;
  file_id: string;
  file_type: string;
  tags?: Array<TagData>;
  title?: string;
  upload_time: string;
  uploaded_by?: UserData;
}
