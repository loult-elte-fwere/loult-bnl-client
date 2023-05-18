/* tslint:disable */
/* eslint-disable */
export interface MediaFileQuery {
  max_creation_time: string;
  query_archived?: boolean;
  query_media_type?: 'all' | 'image' | 'audio' | 'video';
  query_not_archived?: boolean;
  sort_type?: 'ascending' | 'descending' | 'random';
}
