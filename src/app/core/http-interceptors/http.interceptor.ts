import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service'

@Injectable()
export class HttpBaseInterceptor implements HttpInterceptor {
  constructor(private _localStorage: LocalStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let req
    let headers
    const token = this._localStorage.getItem('user')?.token
    const lang = this._localStorage.getItem('SETTINGS')?.language || 'fa'
    request = request.clone({
      withCredentials: true
    })

    if (request.url.indexOf('auth/refresh') < 0) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept-Language': lang || 'en'
      })
      req = request.clone({ headers: headers })
    } else {
      req = request
    }

    return next.handle(req)
  }
}
