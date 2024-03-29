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

import { Lockdown } from '../models/lockdown';
import { Trash } from '../models/trash';
import { UserData } from '../models/user-data';
import { UserId } from '../models/user-id';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation adminDeleteUserDelete
   */
  static readonly AdminDeleteUserDeletePath = '/admin/delete/user/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminDeleteUserDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminDeleteUserDelete$Response(params: {
    body: UserId
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminDeleteUserDeletePath, 'delete');
    if (params) {
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
   * To access the full response (for headers, for example), `adminDeleteUserDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminDeleteUserDelete(params: {
    body: UserId
  },
  context?: HttpContext

): Observable<void> {

    return this.adminDeleteUserDelete$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation adminTrashUserPost
   */
  static readonly AdminTrashUserPostPath = '/admin/trash/user/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminTrashUserPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminTrashUserPost$Response(params: {
    body: Trash
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UserData>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminTrashUserPostPath, 'post');
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
        return r as StrictHttpResponse<UserData>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminTrashUserPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminTrashUserPost(params: {
    body: Trash
  },
  context?: HttpContext

): Observable<UserData> {

    return this.adminTrashUserPost$Response(params,context).pipe(
      map((r: StrictHttpResponse<UserData>) => r.body as UserData)
    );
  }

  /**
   * Path part for operation adminLockdownGet
   */
  static readonly AdminLockdownGetPath = '/admin/lockdown/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminLockdownGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminLockdownGet$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Lockdown>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminLockdownGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Lockdown>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminLockdownGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminLockdownGet(params?: {
  },
  context?: HttpContext

): Observable<Lockdown> {

    return this.adminLockdownGet$Response(params,context).pipe(
      map((r: StrictHttpResponse<Lockdown>) => r.body as Lockdown)
    );
  }

  /**
   * Path part for operation adminLockdownPatch
   */
  static readonly AdminLockdownPatchPath = '/admin/lockdown/';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminLockdownPatch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminLockdownPatch$Response(params: {
    body: Lockdown
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Lockdown>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminLockdownPatchPath, 'patch');
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
        return r as StrictHttpResponse<Lockdown>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminLockdownPatch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminLockdownPatch(params: {
    body: Lockdown
  },
  context?: HttpContext

): Observable<Lockdown> {

    return this.adminLockdownPatch$Response(params,context).pipe(
      map((r: StrictHttpResponse<Lockdown>) => r.body as Lockdown)
    );
  }

}
