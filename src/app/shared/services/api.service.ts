import { Injectable, Injector } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { first, interval, Observable, of, takeWhile } from 'rxjs'

import { TranslateService } from '@ngx-translate/core'
import { environment } from '@env/environment'
import { actionSettingsAddInProgressApi, actionSettingsLoading, actionSettingsRemoveInProgressApi } from '@core/settings/settings.actions'
import { select, Store } from '@ngrx/store'
import { AppState } from '@core/core.state'
import { selectSettingsInProgressApi, selectSettingsLoading } from '@core/settings/settings.selectors'
import { PermissionService } from '@shared/services/permission/permission.service'
import { Utility } from '@shared/services/utility'
import { filter, switchMap } from 'rxjs/operators'

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
interface Options {
  id?: string
  notify?: boolean
  force?: boolean
  headers?: any
  body?: any
  formData?: boolean
  params?: any
  options?: any
  ignore_prefix_api?: any
  api_version?: string
  part?: 'aaa' | 'ticketing' | 'contactcenter'
  permission?: string[]
  disable_loading?: boolean
}
type SuccessCallback = (res: any) => void
type ErrorCallback = (err: any) => void

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  showLoading$ = this.store.pipe(select(selectSettingsLoading))
  inProgressApis$ = this.store.pipe(select(selectSettingsInProgressApi))
  countApiCall = 0

  constructor(
    private _http: HttpClient,
    private _translate: TranslateService,
    private store: Store<AppState>,
    private _permissionsService: PermissionService
  ) {}

  private _requests: Array<Observable<ArrayBuffer>> = []

  private _intro(key: string, options: Options): void {
    if (options.notify != false) {
      this._translate.get('notify.request').subscribe(text => {})
    }
  }

  private async _trigger(key: string, success: SuccessCallback, error: ErrorCallback, options: Options) {
    // if (key != 'refreshToken') {
    //   await this.waitForRefreshToken('refreshToken')
    // }
    this._requests[key] = this._requests[key].subscribe(
      (res: any) => {
        this.remove(key, options?.disable_loading)
        success(res)
      },
      (err: any) => {
        setTimeout(_ => {
          this.remove(key, options?.disable_loading)
          if (error) error(err)
        }, 10)
      }
    )
  }

  setLoading(show: boolean) {
    this.store.dispatch(actionSettingsLoading({ show_loading: show }))
  }

  setSpecificLoading(show: boolean, apiKey: string) {
    if (show) {
      this.store.dispatch(actionSettingsAddInProgressApi({ apiKey: apiKey }))
    } else {
      this.store.dispatch(actionSettingsRemoveInProgressApi({ apiKey: apiKey }))
    }
  }

  public formData(params: any): FormData {
    let formData = new FormData()
    for (let key in params) {
      formData.append(key, params[key])
    }
    return formData
  }

  private _bodyHandler(method: Method, options: Options): any {
    if (!options.body) return null
    if (options.formData) return this.formData(options.body)
    return options.body
  }

  public httpParams(params: any): HttpParams {
    let httpParams: HttpParams = new HttpParams()
    for (let key in params) {
      if ((Array.isArray(params[key]) && !params[key].length) || !params[key]) continue
      httpParams = httpParams.append(key.toString(), params[key].toString())
    }
    return httpParams
  }

  public set(url: string, method: Method, options: Options, success?: SuccessCallback, error?: ErrorCallback): Observable<any> {
    if (options?.permission && !this._permissionsService.checkAccess({ default: options.permission })) {
      return of(null)
    }
    let key: string = options.id || url
    let req = this._http.request(method, (options?.ignore_prefix_api ? '' : environment.baseApiUrl) + (options?.api_version ? options?.api_version : 'v1') + `/${url}`, {
      headers: options.headers || {},
      body: this._bodyHandler(method, options),
      params: this.httpParams(options.params),
      ...options.options
    })

    if (!!success && (!this._requests[key] || options.force)) {
      if (!options?.disable_loading) {
        // this.countApiCall++
        // this.setLoading(true)
        this.setSpecificLoading(true, key)
      }
      this._intro(key, options)
      this._requests[key] = req
      this._trigger(key, success, error, options)
    }
    return req
  }

  public setUpload(url: string, method: Method, options: Options, success?: SuccessCallback, error?: ErrorCallback): Observable<any> {
    if (options?.permission && !this._permissionsService.checkAccess({ default: options.permission })) {
      return of(null)
    }
    let key: string = options.id || url
    let req = this._http.request(method, (options?.ignore_prefix_api ? '' : environment.baseApiUrl) + `${url}`, {
      headers: options.headers || {},
      body: this._bodyHandler(method, options),
      params: this.httpParams(options.params),
      ...options.options
    })

    if (!!success && (!this._requests[key] || options.force)) {
      if (!options?.disable_loading) {
        // this.countApiCall++
        // this.setLoading(true)
        this.setSpecificLoading(true, key)
      }
      this._intro(key, options)
      this._requests[key] = req
      this._trigger(key, success, error, options)
    }
    return req
  }

  public remove(key: string, disable_loading: boolean): void {
    if (!!this._requests[key]) {
      this._requests[key].unsubscribe()
      delete this._requests[key]
      if (!disable_loading) {
        // this.countApiCall--
        // if (this.countApiCall === 0) this.setLoading(false)
        this.setSpecificLoading(false, key)
      }
    }
  }

  waitForRefreshToken(item: string) {
    return interval(1000)
      .pipe(
        switchMap(() => this.inProgressApis$),
        takeWhile(array => array.includes(item), true)
      )
      .toPromise()
  }

  public downloadFile(method: string, route: string, part: 'aaa' | 'ticketing' | 'contactcenter', filename: string = null, body?: any, ignore_prefix_api = false, api_version = 'v1'): void {
    if (method == 'POST') {
      this.set(
        route,
        'POST',
        {
          id: body?.id,
          body: body,
          ignore_prefix_api: ignore_prefix_api,
          options: { responseType: 'blob' },
          api_version: api_version,
          part: part
        },
        response => {
          let dataType = response.type
          let binaryData = []
          binaryData.push(response)
          let downloadLink = document.createElement('a')
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }))
          if (filename) downloadLink.setAttribute('download', filename)
          document.body.appendChild(downloadLink)
          downloadLink.click()
        }
      )
    } else if (method == 'GET') {
      this.set(
        route,
        'GET',
        {
          id: body?.id,
          params: body,
          ignore_prefix_api: ignore_prefix_api,
          options: { responseType: 'blob' },
          api_version: api_version,
          part: part
        },
        response => {
          let dataType = response.type
          let binaryData = []
          binaryData.push(response)
          let downloadLink = document.createElement('a')
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }))
          if (filename) downloadLink.setAttribute('download', filename)
          document.body.appendChild(downloadLink)
          downloadLink.click()
        }
      )
    }
  }
}
