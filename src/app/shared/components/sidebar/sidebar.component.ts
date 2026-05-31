import { AsyncPipe, NgClass, NgIf, NgSwitch, NgSwitchCase } from '@angular/common'
import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'
import { AppState } from '@core/core.state'
import { actionSettingsChangeMobileSidebar, actionSettingsChangeProfileMenu, actionSettingsChangeSidebarType } from '@core/settings/settings.actions'
import { selectProfileMenu, selectSidebar, selectSidebarType } from '@core/settings/settings.selectors'
import { environment } from '@env/environment'
import { select, Store } from '@ngrx/store'
import { SidebarFacade } from '@shared/components/sidebar/+state/sidebar.facade'
import { IconDirective } from '@shared/directives/icon.directive'
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service'
import { Utility } from '@shared/services/utility'
import { MenuItem } from 'primeng/api'
import { PanelMenuModule } from 'primeng/panelmenu'
import { Ripple } from 'primeng/ripple'
import { TieredMenuModule } from 'primeng/tieredmenu'
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs'
import { map } from 'rxjs/operators'
import { ThemeService } from '../../../theme/theme.service'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sidebar',
  standalone: true,
  imports: [PanelMenuModule, Ripple, NgIf, AsyncPipe, NgClass, NgSwitch, NgSwitchCase, TieredMenuModule, RouterLink, IconDirective],
  providers: [SidebarFacade],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent extends Utility implements OnInit, OnDestroy {
  activeMainMenu = new BehaviorSubject<MenuItem | null>(null)
  show_secondary_menu$: Observable<boolean> = this.store.pipe(select(selectSidebar))
  isAdmin = this.permissionService.checkUserType().includes('admin')
  profile_menu_options$ = new BehaviorSubject<MenuItem[]>([
    {
      id: 'profile',
      items: [
        { icon: 'person', label: 'navbar.profile' },
        { icon: 'logout', label: 'navbar.logout' }
      ]
    }
  ])
  items: MenuItem[] = [
    {
      icon: 'palette',
      label: 'sidebar.design-system',
      visible: !environment.production,
      route: '/design-system'
    },
    {
      icon: 'admin_panel_settings',
      label: 'Drop Down',
      expanded: this.checkActiveState('/management'),
      visible: true,
      items: [
        {
          label: 'item 1',
          route: '',
          visible: true
        },
        {
          label: 'item 2',
          route: '',
          visible: true
        },
      ]
    },
  ].map(level1 => ({
    ...level1,
    state: { level: 1 },
    items: level1?.items?.map(level2 => ({
      ...level2,
      state: { level: 2 }
    }))
  }))
  assetURL = environment.assetURL
  sidebarItems$ = this._facade.sidebarItems$.pipe(map(data => structuredClone(data)))
  secondMenuItems$ = new BehaviorSubject([])
  show_sidebar$: Observable<boolean> = this.store.pipe(select(selectSidebar))
  sidebarType$: Observable<'static' | 'slim' | 'slim+' | 'horizontal' | 'none'> = this.store.pipe(select(selectSidebarType))
  profileMenu$: Observable<'start' | 'end'> = this.store.pipe(select(selectProfileMenu))
  destroy$ = new Subject()

  constructor(
    private _facade: SidebarFacade,
    public store: Store<AppState>,
    injector: Injector,
    private _localStorage: LocalStorageService,
    private theme: ThemeService
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this._facade.touchState$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this._facade.updateSidebarItems([...this.items])
      this.items.forEach(item => {
        if (this.checkActiveState(item?.route)) this.selectMainMenuItem(item)
      })
    })
    this.items.forEach(item => {
      if (item.expanded) {
        this.selectMainMenuItem(item)
      }
    })
    this.store.dispatch(actionSettingsChangeSidebarType({ sidebar_type: this._localStorage.getItem('theme')?.menu_type }))
    this.store.dispatch(actionSettingsChangeProfileMenu({ profile_menu: this._localStorage.getItem('theme')?.profile_menu }))

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    this.handleMediaChange(mediaQuery)

    const listener = (event: MediaQueryListEvent) => this.handleMediaChange(event)
    mediaQuery.addEventListener('change', listener)

    this.destroy$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      mediaQuery.removeEventListener('change', listener)
    })
  }

  checkActiveState(givenLink: string) {
    return this.router.url.indexOf(givenLink) !== -1
  }

  get username(): string {
    return this._localStorage.getItem('userInfo')?.user?.username || ''
  }

  selectMainMenuItem(item: MenuItem) {
    if (item?.disabled) return
    let items = item?.items?.length ? item.items : [{ ...item, label: this.translate.instant(item.label) }]
    items = items.map(level2 => ({
      ...level2,
      icon: '',
      label: this.translate.instant(level2.label),
      items: level2?.items?.map(level3 => ({
        ...level3,
        icon: '',
        label: this.translate.instant(level3.label)
      }))
    }))
    this.secondMenuItems$.next(items)
    this.activeMainMenu.next(item)
    // this.store.dispatch(actionSettingsChangeSidebar({ show_sidebar: !!item?.items }))
  }

  closeSidebar() {
    this.store.dispatch(actionSettingsChangeMobileSidebar({ show_mobile_sidebar: false }))
  }

  private handleMediaChange(media: MediaQueryList | MediaQueryListEvent): void {
    const sidebarType = media.matches ? 'none' : 'static'
    this.store.dispatch(actionSettingsChangeSidebarType({ sidebar_type: sidebarType }))
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
