/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { FileData } from '../models/file-data';
import { FileMetaData } from '../models/file-meta-data';
import { TagsList } from '../models/tags-list';
import { UserData } from '../models/user-data';
import { UserId } from '../models/user-id';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation usersDataCurrentGet
   */
  static readonly UsersDataCurrentGetPath = '/users/data/current/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersDataCurrentGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersDataCurrentGet$Response(params?: {
  }): Observable<StrictHttpResponse<UserData>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersDataCurrentGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserData>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersDataCurrentGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersDataCurrentGet(params?: {
  }): Observable<UserData> {

    return this.usersDataCurrentGet$Response(params).pipe(
      map((r: StrictHttpResponse<UserData>) => r.body as UserData)
    );
  }

  /**
   * Path part for operation usersDataUserIdGet
   */
  static readonly UsersDataUserIdGetPath = '/users/data/{user_id}/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersDataUserIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersDataUserIdGet$Response(params: {
    user_id: string;
  }): Observable<StrictHttpResponse<UserData>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersDataUserIdGetPath, 'get');
    if (params) {
      rb.path('user_id', params.user_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserData>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersDataUserIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersDataUserIdGet(params: {
    user_id: string;
  }): Observable<UserData> {

    return this.usersDataUserIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<UserData>) => r.body as UserData)
    );
  }

  /**
   * Path part for operation usersDeleteDelete
   */
  static readonly UsersDeleteDeletePath = '/users/delete/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersDeleteDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersDeleteDelete$Response(params: {
    body: UserId
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersDeleteDeletePath, 'delete');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersDeleteDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersDeleteDelete(params: {
    body: UserId
  }): Observable<void> {

    return this.usersDeleteDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation usersLibraryListUserIdGet
   */
  static readonly UsersLibraryListUserIdGetPath = '/users/library/list/{user_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersLibraryListUserIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersLibraryListUserIdGet$Response(params: {
    user_id: string;
  }): Observable<StrictHttpResponse<Array<FileData>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersLibraryListUserIdGetPath, 'get');
    if (params) {
      rb.path('user_id', params.user_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FileData>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersLibraryListUserIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersLibraryListUserIdGet(params: {
    user_id: string;
  }): Observable<Array<FileData>> {

    return this.usersLibraryListUserIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<FileData>>) => r.body as Array<FileData>)
    );
  }

  /**
   * Path part for operation usersArchiveFileIdPost
   */
  static readonly UsersArchiveFileIdPostPath = '/users/archive/{file_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersArchiveFileIdPost()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersArchiveFileIdPost$Response(params: {
    file_id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersArchiveFileIdPostPath, 'post');
    if (params) {
      rb.path('file_id', params.file_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersArchiveFileIdPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersArchiveFileIdPost(params: {
    file_id: string;
  }): Observable<void> {

    return this.usersArchiveFileIdPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation usersArchiveFileIdDelete
   */
  static readonly UsersArchiveFileIdDeletePath = '/users/archive/{file_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersArchiveFileIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersArchiveFileIdDelete$Response(params: {
    file_id: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersArchiveFileIdDeletePath, 'delete');
    if (params) {
      rb.path('file_id', params.file_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersArchiveFileIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersArchiveFileIdDelete(params: {
    file_id: string;
  }): Observable<void> {

    return this.usersArchiveFileIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation usersMetadataEditFileIdPatch
   */
  static readonly UsersMetadataEditFileIdPatchPath = '/users/metadata/edit/{file_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersMetadataEditFileIdPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersMetadataEditFileIdPatch$Response(params: {
    file_id: string;
    body: FileMetaData
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersMetadataEditFileIdPatchPath, 'patch');
    if (params) {
      rb.path('file_id', params.file_id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersMetadataEditFileIdPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersMetadataEditFileIdPatch(params: {
    file_id: string;
    body: FileMetaData
  }): Observable<void> {

    return this.usersMetadataEditFileIdPatch$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation usersTagsListGet
   */
  static readonly UsersTagsListGetPath = '/users/tags/list/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersTagsListGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersTagsListGet$Response(params?: {
  }): Observable<StrictHttpResponse<TagsList>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersTagsListGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TagsList>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersTagsListGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersTagsListGet(params?: {
  }): Observable<TagsList> {

    return this.usersTagsListGet$Response(params).pipe(
      map((r: StrictHttpResponse<TagsList>) => r.body as TagsList)
    );
  }

}
