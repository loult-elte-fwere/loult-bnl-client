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

import { Error } from '../models/error';
import { FileData } from '../models/file-data';
import { FileShortData } from '../models/file-short-data';
import { FileUpload } from '../models/file-upload';
import { MediaFileQuery } from '../models/media-file-query';
import { MultipartFile } from '../models/multipart-file';

@Injectable({
  providedIn: 'root',
})
export class MediaService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation mediaUploadJsonPost
   */
  static readonly MediaUploadJsonPostPath = '/media/upload/json';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaUploadJsonPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mediaUploadJsonPost$Response(params: {
    body: FileUpload
  },
  context?: HttpContext

): Observable<StrictHttpResponse<FileData>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaUploadJsonPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FileData>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mediaUploadJsonPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mediaUploadJsonPost(params: {
    body: FileUpload
  },
  context?: HttpContext

): Observable<FileData> {

    return this.mediaUploadJsonPost$Response(params,context).pipe(
      map((r: StrictHttpResponse<FileData>) => r.body as FileData)
    );
  }

  /**
   * Path part for operation mediaUploadMultipartPost
   */
  static readonly MediaUploadMultipartPostPath = '/media/upload/multipart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaUploadMultipartPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mediaUploadMultipartPost$Response(params: {
    body: MultipartFile
  },
  context?: HttpContext

): Observable<StrictHttpResponse<FileData>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaUploadMultipartPostPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FileData>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mediaUploadMultipartPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  mediaUploadMultipartPost(params: {
    body: MultipartFile
  },
  context?: HttpContext

): Observable<FileData> {

    return this.mediaUploadMultipartPost$Response(params,context).pipe(
      map((r: StrictHttpResponse<FileData>) => r.body as FileData)
    );
  }

  /**
   * Path part for operation mediaContentVideoFileIdGet
   */
  static readonly MediaContentVideoFileIdGetPath = '/media/content/video/{file_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaContentVideoFileIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentVideoFileIdGet$Response(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Error>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaContentVideoFileIdGetPath, 'get');
    if (params) {
      rb.path('file_id', params.file_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Error>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mediaContentVideoFileIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentVideoFileIdGet(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<Error> {

    return this.mediaContentVideoFileIdGet$Response(params,context).pipe(
      map((r: StrictHttpResponse<Error>) => r.body as Error)
    );
  }

  /**
   * Path part for operation mediaContentAudioFileIdGet
   */
  static readonly MediaContentAudioFileIdGetPath = '/media/content/audio/{file_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaContentAudioFileIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentAudioFileIdGet$Response(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Error>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaContentAudioFileIdGetPath, 'get');
    if (params) {
      rb.path('file_id', params.file_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Error>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mediaContentAudioFileIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentAudioFileIdGet(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<Error> {

    return this.mediaContentAudioFileIdGet$Response(params,context).pipe(
      map((r: StrictHttpResponse<Error>) => r.body as Error)
    );
  }

  /**
   * Path part for operation mediaContentImageFileIdGet
   */
  static readonly MediaContentImageFileIdGetPath = '/media/content/image/{file_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaContentImageFileIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentImageFileIdGet$Response(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Error>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaContentImageFileIdGetPath, 'get');
    if (params) {
      rb.path('file_id', params.file_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Error>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mediaContentImageFileIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentImageFileIdGet(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<Error> {

    return this.mediaContentImageFileIdGet$Response(params,context).pipe(
      map((r: StrictHttpResponse<Error>) => r.body as Error)
    );
  }

  /**
   * Path part for operation mediaContentFileIdGet
   */
  static readonly MediaContentFileIdGetPath = '/media/content/{file_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaContentFileIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentFileIdGet$Response(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Error>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaContentFileIdGetPath, 'get');
    if (params) {
      rb.path('file_id', params.file_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Error>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mediaContentFileIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentFileIdGet(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<Error> {

    return this.mediaContentFileIdGet$Response(params,context).pipe(
      map((r: StrictHttpResponse<Error>) => r.body as Error)
    );
  }

  /**
   * Path part for operation mediaContentImageMiniatureFileIdGet
   */
  static readonly MediaContentImageMiniatureFileIdGetPath = '/media/content/image/miniature/{file_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaContentImageMiniatureFileIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentImageMiniatureFileIdGet$Response(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Error>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaContentImageMiniatureFileIdGetPath, 'get');
    if (params) {
      rb.path('file_id', params.file_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Error>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mediaContentImageMiniatureFileIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentImageMiniatureFileIdGet(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<Error> {

    return this.mediaContentImageMiniatureFileIdGet$Response(params,context).pipe(
      map((r: StrictHttpResponse<Error>) => r.body as Error)
    );
  }

  /**
   * Path part for operation mediaContentDataFileIdGet
   */
  static readonly MediaContentDataFileIdGetPath = '/media/content/data/{file_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaContentDataFileIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentDataFileIdGet$Response(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<FileData>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaContentDataFileIdGetPath, 'get');
    if (params) {
      rb.path('file_id', params.file_id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FileData>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mediaContentDataFileIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentDataFileIdGet(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<FileData> {

    return this.mediaContentDataFileIdGet$Response(params,context).pipe(
      map((r: StrictHttpResponse<FileData>) => r.body as FileData)
    );
  }

  /**
   * Path part for operation mediaContentListLastUploadedPost
   */
  static readonly MediaContentListLastUploadedPostPath = '/media/content/list/last_uploaded';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaContentListLastUploadedPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mediaContentListLastUploadedPost$Response(params: {
    page?: number;
    page_size?: number;
    body: MediaFileQuery
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<FileData>>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaContentListLastUploadedPostPath, 'post');
    if (params) {
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
   * To access the full response (for headers, for example), `mediaContentListLastUploadedPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mediaContentListLastUploadedPost(params: {
    page?: number;
    page_size?: number;
    body: MediaFileQuery
  },
  context?: HttpContext

): Observable<Array<FileData>> {

    return this.mediaContentListLastUploadedPost$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<FileData>>) => r.body as Array<FileData>)
    );
  }

  /**
   * Path part for operation mediaContentSearchGet
   */
  static readonly MediaContentSearchGetPath = '/media/content/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaContentSearchGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentSearchGet$Response(params: {
    title: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<FileShortData>>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaContentSearchGetPath, 'get');
    if (params) {
      rb.query('title', params.title, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<FileShortData>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `mediaContentSearchGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentSearchGet(params: {
    title: string;
  },
  context?: HttpContext

): Observable<Array<FileShortData>> {

    return this.mediaContentSearchGet$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<FileShortData>>) => r.body as Array<FileShortData>)
    );
  }

  /**
   * Path part for operation mediaContentListTagTagNamePost
   */
  static readonly MediaContentListTagTagNamePostPath = '/media/content/list/tag/{tag_name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaContentListTagTagNamePost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mediaContentListTagTagNamePost$Response(params: {
    tag_name: string;
    page?: number;
    page_size?: number;
    body: MediaFileQuery
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<FileData>>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaContentListTagTagNamePostPath, 'post');
    if (params) {
      rb.path('tag_name', params.tag_name, {});
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
   * To access the full response (for headers, for example), `mediaContentListTagTagNamePost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  mediaContentListTagTagNamePost(params: {
    tag_name: string;
    page?: number;
    page_size?: number;
    body: MediaFileQuery
  },
  context?: HttpContext

): Observable<Array<FileData>> {

    return this.mediaContentListTagTagNamePost$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<FileData>>) => r.body as Array<FileData>)
    );
  }

  /**
   * Path part for operation mediaContentDeleteFileIdDelete
   */
  static readonly MediaContentDeleteFileIdDeletePath = '/media/content/delete/{file_id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mediaContentDeleteFileIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentDeleteFileIdDelete$Response(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, MediaService.MediaContentDeleteFileIdDeletePath, 'delete');
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
   * To access the full response (for headers, for example), `mediaContentDeleteFileIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mediaContentDeleteFileIdDelete(params: {
    file_id: string;
  },
  context?: HttpContext

): Observable<void> {

    return this.mediaContentDeleteFileIdDelete$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
