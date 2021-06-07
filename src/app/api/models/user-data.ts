/* tslint:disable */
/* eslint-disable */
import { Roles } from './roles';
export interface UserData {
  adjective: string;
  color: string;
  img_id: string;
  pokename: string;
  role_names?: Array<string>;
  roles_rights?: Roles;
  userid: string;
}
