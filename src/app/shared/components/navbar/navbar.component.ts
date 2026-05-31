import { AsyncPipe, NgClass, NgIf, NgSwitch, NgSwitchCase } from '@angular/common'
import { ChangeDetectionStrategy, Component, HostListener, Injector, OnDestroy, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { authLogout } from '@core/auth/auth.actions'
import { AppState } from '@core/core.state'
import { actionSettingsChangeDirection, actionSettingsChangeLanguage, actionSettingsChangeSidebarType, actionSettingsChangeNavbarType, actionSettingsDarkMode, actionSettingsSetNotifications } from '@core/settings/settings.actions'
import { selectDarkMode, selectEffectiveTheme, selectMobileSidebar, selectNavbarType, selectRtlDirection, selectSettingsLanguage, selectSettingsLoading, selectSettingsNotification, selectSidebar, selectSidebarType } from '@core/settings/settings.selectors'
import { environment } from '@env/environment'
import { select, Store } from '@ngrx/store'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { BreadcrumbFacade } from '@shared/components/breadcrumb/+state/breadcrumb.facade'
import { SidebarFacade } from '@shared/components/sidebar/+state/sidebar.facade'
import { IconDirective } from '@shared/directives/icon.directive'
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service'
import { Utility } from '@shared/services/utility'
import { MenuItem } from 'primeng/api'
import { Avatar } from 'primeng/avatar'
import { Dialog } from 'primeng/dialog'
import { Menu } from 'primeng/menu'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { Ripple } from 'primeng/ripple'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { ProfileComponent } from '../../../pages/profile/profile.component'
import { ThemeService } from '../../../theme/theme.service'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [FormsModule, OverlayPanelModule, NgIf, AsyncPipe, NgClass, RouterLink, Avatar, Menu, IconDirective, Ripple, TranslateDirective, Dialog, TranslatePipe, ProfileComponent, NgSwitch, NgSwitchCase],
  providers: [SidebarFacade],
  styleUrls: []
})
export class NavbarComponent extends Utility implements OnInit, OnDestroy {
  theme$: Observable<string> = this.store.pipe(select(selectEffectiveTheme))
  darkMode$: Observable<boolean> = this.store.pipe(select(selectDarkMode))
  rtl$: Observable<boolean> = this.store.pipe(select(selectRtlDirection))
  show_sidebar$: Observable<boolean> = this.store.pipe(select(selectSidebar))
  show_mobile_sidebar$: Observable<boolean> = this.store.pipe(select(selectMobileSidebar))
  language$: Observable<string> = this.store.pipe(select(selectSettingsLanguage))
  notifications$: Observable<any[]> = this.store.pipe(select(selectSettingsNotification))
  show_loading$: Observable<boolean> = this.store.pipe(select(selectSettingsLoading))
  sidebarType$: Observable<'static' | 'slim' | 'slim+' | 'horizontal' | 'none'> = this.store.pipe(select(selectSidebarType))
  navbar_type$: Observable<'spaceBetween' | 'center'> = this.store.pipe(select(selectNavbarType))
  sidebarItems$ = this.sidebarFacade.sidebarItems$.pipe(map(data => this.addRouterLink(data)))
  destroy$ = new Subject()
  optionsLang = [
    { label: 'FA', value: 'fa' },
    { label: 'EN', value: 'en' }
  ]
  profile_menu$ = new BehaviorSubject<MenuItem[]>([
    {
      icon: 'person',
      label: 'navbar.profile',
      command: _ => {
        this.dialogVisible_profile = true
      }
    },
    {
      icon: 'logout',
      label: 'navbar.logout',
      command: _ => {
        this.logOut()
      }
    }
  ])
  notification_menu$ = new BehaviorSubject<MenuItem[]>([])
  dialogVisible_profile: boolean = false
  isMobile = false

  constructor(
    injector: Injector,
    private store: Store<AppState>,
    private _localStorage: LocalStorageService,
    private sidebarFacade: SidebarFacade,
    private breadcrumbFacade: BreadcrumbFacade,
    private theme: ThemeService
  ) {
    super(injector)
  }

  get username(): string {
    return this._localStorage.getItem('userInfo')?.user?.username || ''
  }

  ngOnInit(): void {
    this.darkMode$.pipe(takeUntil(this.destroy$)).subscribe(dark => {
      const element = document.querySelector('html')
      if (dark) element.classList.add('dark')
      else element.classList.remove('dark')
    })
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
    this.language$.pipe(takeUntil(this.destroy$)).subscribe((lang: string) => {
      this.breadcrumbFacade.touchData()
      this.sidebarFacade.touchData()
    })
    this.store.dispatch(actionSettingsChangeNavbarType({ navbar_type: this._localStorage.getItem('theme')?.navbar_type }))
    this.checkIfMobile()
  }

  toggleDarkMode(dark: boolean) {
    this.store.dispatch(actionSettingsDarkMode({ dark: dark }))
    this.cd.detectChanges()
  }

  @HostListener('window:resize')
  onResize() {
    this.checkIfMobile()
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 768
  }

  toggle_sidebar() {
    this.sidebarType$.pipe(take(1)).subscribe(currentType => {
      if (this.isMobile) {
        const newType = currentType === 'slim' ? 'none' : 'slim'
        this.store.dispatch(actionSettingsChangeSidebarType({ sidebar_type: newType }))
      } else {
        const newType = currentType === 'static' ? 'slim' : 'static'
        this.store.dispatch(actionSettingsChangeSidebarType({ sidebar_type: newType }))
      }
    })
  }

  setNotifications(items) {
    this.store.dispatch(actionSettingsSetNotifications({ notifications: items }))
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
    this.router.navigate(['/'])
  }

  logOut() {
    this.router.navigate(['/auth'])
  }

  showDesigner() {
    localStorage.setItem('appConfigState', JSON.stringify({ ...JSON.parse(localStorage.getItem('appConfigState')), menuActive: true }))
  }

  addRouterLink(items: any[]): any[] {
    return items.map(item => {
      const clonedItem = structuredClone(item)
      clonedItem.routerLink = clonedItem.route
      if (clonedItem.items && Array.isArray(clonedItem.items)) {
        clonedItem.items = this.addRouterLink(clonedItem.items)
      }
      return clonedItem
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  protected readonly environment = environment
}
