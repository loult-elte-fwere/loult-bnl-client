/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
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
import { UserLibraryQuery } from '../models/user-library-query';

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
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UserData>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersDataCurrentGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserData>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usersDataCurrentGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersDataCurrentGet(params?: {
  },
  context?: HttpContext

): Observable<UserData> {

    return this.usersDataCurrentGet$Response(params,context).pipe(
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
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UserData>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersDataUserIdGetPath, 'get');
    if (params) {
      rb.path('user_id', params.user_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserData>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usersDataUserIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersDataUserIdGet(params: {
    user_id: string;
  },
  context?: HttpContext

): Observable<UserData> {

    return this.usersDataUserIdGet$Response(params,context).pipe(
      map((r: StrictHttpResponse<UserData>) => r.body as UserData)
    );
  }

  /**
   * Path part for operation usersDataAllGet
   */
  static readonly UsersDataAllGetPath = '/users/data/all/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersDataAllGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersDataAllGet$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<UserData>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersDataAllGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<UserData>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usersDataAllGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersDataAllGet(params?: {
  },
  context?: HttpContext

): Observable<Array<UserData>> {

    return this.usersDataAllGet$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<UserData>>) => r.body as Array<UserData>)
    );
  }

  /**
   * Path part for operation usersLibraryListUserIdPost
   */
  static readonly UsersLibraryListUserIdPostPath = '/users/library/list/{user_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersLibraryListUserIdPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersLibraryListUserIdPost$Response(params: {
    user_id: string;
    page?: number;
    page_size?: number;
    body: UserLibraryQuery
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<FileData>>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersLibraryListUserIdPostPath, 'post');
    if (params) {
      rb.path('user_id', params.user_id, {});
      rb.query('page', params.page, {});
      rb.query('page_size', params.page_size, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FileData>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usersLibraryListUserIdPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersLibraryListUserIdPost(params: {
    user_id: string;
    page?: number;
    page_size?: number;
    body: UserLibraryQuery
  },
  context?: HttpContext

): Observable<Array<FileData>> {

    return this.usersLibraryListUserIdPost$Response(params,context).pipe(
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
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersArchiveFileIdPostPath, 'post');
    if (params) {
      rb.path('file_id', params.file_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usersArchiveFileIdPost$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersArchiveFileIdPost(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<void> {

    return this.usersArchiveFileIdPost$Response(params,context).pipe(
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
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersArchiveFileIdDeletePath, 'delete');
    if (params) {
      rb.path('file_id', params.file_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usersArchiveFileIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersArchiveFileIdDelete(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<void> {

    return this.usersArchiveFileIdDelete$Response(params,context).pipe(
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
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersMetadataEditFileIdPatchPath, 'patch');
    if (params) {
      rb.path('file_id', params.file_id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usersMetadataEditFileIdPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersMetadataEditFileIdPatch(params: {
    file_id: string;
    body: FileMetaData
  },
  context?: HttpContext

): Observable<void> {

    return this.usersMetadataEditFileIdPatch$Response(params,context).pipe(
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
  },
  context?: HttpContext

): Observable<StrictHttpResponse<TagsList>> {

    const rb = new RequestBuilder(this.rootUrl, UsersService.UsersTagsListGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TagsList>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `usersTagsListGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersTagsListGet(params?: {
  },
  context?: HttpContext

): Observable<TagsList> {

    return this.usersTagsListGet$Response(params,context).pipe(
      map((r: StrictHttpResponse<TagsList>) => r.body as TagsList)
    );
  }

}
