/* tslint:disable */
/* eslint-disable */
import { MediaFileQuery } from './media-file-query';
import { UserLibraryFilters } from './user-library-filters';
export interface UserLibraryQuery {
  base_query?: MediaFileQuery;
  users_filters?: UserLibraryFilters;
}
