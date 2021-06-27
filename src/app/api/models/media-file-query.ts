/* tslint:disable */
/* eslint-disable */
export interface MediaFileQuery {
  max_creation_time: string;
  query_archived?: boolean;
  query_audio?: boolean;
  query_images?: boolean;
  query_not_archived?: boolean;
  sort_type?: 'ascending' | 'descending' | 'random';
}
