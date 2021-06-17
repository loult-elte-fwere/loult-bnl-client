/* tslint:disable */
/* eslint-disable */
export interface MediaFileQuery {
  archived_filter?: 'archived' | 'not-archived';
  filter_by_archived?: boolean;
  filter_by_media_type?: boolean;
  max_creation_time: string;
  media_type_filter?: 'image' | 'audio';
  sort_time_ascending?: boolean;
}
