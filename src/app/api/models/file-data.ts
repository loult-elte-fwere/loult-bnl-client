/* tslint:disable */
import { UserData } from './user-data';
export interface FileData  {
  file_id: string;
  file_type: string;
  title?: string;
  upload_time: string;
  uploaded_by?: UserData;
}
