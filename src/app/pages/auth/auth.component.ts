import { AsyncPipe, NgIf } from '@angular/common'
import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { AppState } from '@core/core.state'
import { actionSettingsChangeDirection, actionSettingsChangeLanguage, actionSettingsGenerateCaptcha } from '@core/settings/settings.actions'
import { selectCaptcha, selectRtlDirection, selectSettingsLanguage } from '@core/settings/settings.selectors'
import { environment } from '@env/environment'
import { select, Store } from '@ngrx/store'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { IconDirective } from '@shared/directives/icon.directive'
import { Utility } from '@shared/services/utility'
import { SvgIconComponent } from 'angular-svg-icon'
import { Button } from 'primeng/button'
import { Divider } from 'primeng/divider'
import { FloatLabel } from 'primeng/floatlabel'
import { InputText } from 'primeng/inputtext'
import { Message } from 'primeng/message'
import { Password } from 'primeng/password'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'

@Component({
  imports: [FloatLabel, FormsModule, InputText, TranslateDirective, Button, TranslatePipe, Divider, ReactiveFormsModule, AsyncPipe, IconDirective, Message, SvgIconComponent, NgIf, Password],
  templateUrl: './auth.component.html'
})
export class AuthComponent extends Utility implements OnInit {
  @ViewChild('passwordInput') passwordInput: ElementRef
  showLoading: boolean = false
  public formGroup: FormGroup
  public formGroup_otp: FormGroup
  submitted = false
  captchaImage$ = new BehaviorSubject('')
  captchaID$ = new BehaviorSubject('')
  interval = null
  language$: Observable<string> = this.store.pipe(select(selectSettingsLanguage))
  rtl$: Observable<boolean> = this.store.pipe(select(selectRtlDirection))
  destroy$ = new Subject()
  isTestEnv = environment.test

  constructor(
    private store: Store<AppState>,
    injector: Injector
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this._migrateForm()
    this.store
      .pipe(select(selectCaptcha))
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.captchaID$.next(data.id)
        this.formGroup.get('captchaId').patchValue(data.id)
        this.formGroup_otp.get('captchaId').patchValue(data.id)
        this.captchaImage$.next(data.captcha)
      })
    this.interval = setInterval(() => {
      this.generateCaptcha()
    }, 1000 * 60)
    this.generateCaptcha()
    this.rtl$.pipe(takeUntil(this.destroy$)).subscribe(rtl => {
      const element = document.querySelector('html')
      if (rtl) {
        element.setAttribute('dir', 'rtl')
        element.setAttribute('lang', 'fa')
      } else {
        element.setAttribute('dir', 'ltr')
        element.setAttribute('lang', 'en')
      }
    })
  }

  private _migrateForm(): void {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      captchaId: [''],
      captchaAnswer: ['', [Validators.required]]
    })
    this.formGroup_otp = this.fb.group({
      code: ['', [Validators.required]],
      captchaId: [''],
      captchaAnswer: ['', [Validators.required]]
    })
  }

  submit() {
    this.notify.success({
      message: 'feedback.login_success'
    })
    this.router.navigate(['/'])
  }

  generateCaptcha() {
    this.store.dispatch(actionSettingsGenerateCaptcha({ size: { w: '110', h: '40' } }))
    this.formGroup?.get('captchaAnswer').reset()
    this.submitted = false
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
    clearInterval(this.interval)
  }

  changeLanguage(language: string) {
    switch (language) {
      case 'en': {
        this.store.dispatch(actionSettingsChangeLanguage({ language: 'en' }))
        this.store.dispatch(actionSettingsChangeDirection({ rtl: false }))
        break
      }
      case 'fa': {
        this.store.dispatch(actionSettingsChangeLanguage({ language: 'fa' }))
        this.store.dispatch(actionSettingsChangeDirection({ rtl: true }))
        break
      }
      default: {
        this.store.dispatch(actionSettingsChangeLanguage({ language: 'en' }))
        this.store.dispatch(actionSettingsChangeDirection({ rtl: false }))
      }
    }
  }
}
