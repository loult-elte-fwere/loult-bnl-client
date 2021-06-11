/* tslint:disable */
/* eslint-disable */
import { Permissions } from './permissions';
export interface UserData {
  adjective: string;
  archived_files_count?: number;
  color: string;
  img_id: string;
  last_activity?: string;
  permissions?: Permissions;
  pokename: string;
  role_names?: Array<string>;
  uploaded_files_count?: number;
  userid: string;
}
