import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'
import { Observable, Subject, throwError as observableThrowError } from 'rxjs'
import { catchError, debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators'
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service'
import { Router } from '@angular/router'
import { IMessageService, NotificationService } from '@shared/services/notification.service'
import { MessageService } from 'primeng/api'

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  err_subject = new Subject()

  constructor(
    private _localStorage: LocalStorageService,
    private _router: Router,
    private messageService: MessageService
  ) {
    this.err_subject.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(data => {
      this._error(data)
    })
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (typeof err.error?.text == 'function') {
          err.error?.text().then(blobErr => {
            if (JSON.parse(blobErr)?.error) {
              err.error = JSON.parse(blobErr).error
            }
            this._showError(err, request?.url)
          })
        } else {
          this._showError(err, request?.url)
        }
        return observableThrowError(err)
      })
    )
  }

  private _error(data: IMessageService) {
    this.messageService.add({
      severity: 'error',
      summary: data?.title,
      detail: data?.message,
      closable: false,
      life: 3000
    })
  }

  private _showError(err, url) {
    const getMessages = () => {
      const messages: string[] = err.error?.error?.messages || []
      const title = messages[0] || ''
      const detail = messages.slice(1).join('\n') || err.error?.debug_msg || ''
      return { title, message: detail }
    }

    switch (err.status) {
      case 400:
        if (err.error?.error) {
          if (err.error.error === 'Error in loading user' || err.error.error === 'خطا در یافتن کاربر') {
            this._localStorage.removeItem('user')
            this._router.navigate(['auth'])
          }
          this.err_subject.next(getMessages())
        } else if (err.error) {
          this.err_subject.next(getMessages())
        }
        break
      case 401:
        this.err_subject.next(getMessages())
        this._localStorage.removeItem('user')
        this._localStorage.removeItem('user_info')
        this._router.navigate(['auth'])
        break
      case 403:
      case 404:
        this.err_subject.next(getMessages())
        break
      case 500:
      case 501:
      case 502:
        if (!['callcenter/longpolling/get'].includes(url)) {
          this.err_subject.next({
            title: `${err.status}`,
            message: err.error?.message || ''
          })
        }
        break
      case 503:
      case 504:
      case 505:
      case 506:
      case 507:
      case 508:
      case 510:
      case 511:
        this.err_subject.next({
          title: `${err.status}`,
          message: err.error?.message || ''
        })
        break
      default:
        if (err.status) {
          this.err_subject.next({ title: '', message: 'feedback.unknown_error' })
        }
        break
    }
  }
}
