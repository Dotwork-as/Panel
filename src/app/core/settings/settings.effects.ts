import { Injectable, NgZone } from '@angular/core'
import { ActivationEnd, Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { select, Store } from '@ngrx/store'
import { TranslateService } from '@ngx-translate/core'
import { combineLatest, merge, of } from 'rxjs'
import { distinctUntilChanged, filter, tap, withLatestFrom } from 'rxjs/operators'

import { AnimationsService } from '@core/animations/animations.service'
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service'
import { selectSettingsState } from '../core.state'

import { BreadcrumbFacade } from '@shared/components/breadcrumb/+state/breadcrumb.facade'
import {
  actionSettingsAddInProgressApi,
  actionSettingsChangeAnimationsElements,
  actionSettingsChangeAnimationsPage,
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeAutoNightMode,
  actionSettingsChangeDirection,
  actionSettingsChangeHour,
  actionSettingsChangeInputLabelPosition,
  actionSettingsChangeInputVariant,
  actionSettingsChangeLanguage,
  actionSettingsChangeMobileSidebar,
  actionSettingsChangeNavbarType,
  actionSettingsChangeProfileMenu,
  actionSettingsChangeSidebar,
  actionSettingsChangeSidebarType,
  actionSettingsChangeStickyHeader,
  actionSettingsChangeTheme,
  actionSettingsDarkMode,
  actionSettingsLoading,
  actionSettingsRemoveInProgressApi,
  actionSettingsSetNotifications
} from './settings.actions'
import { State } from './settings.model'
import { selectEffectiveTheme, selectElementsAnimations, selectPageAnimations, selectSettingsLanguage } from './settings.selectors'

export const SETTINGS_KEY = 'SETTINGS'

const INIT = of('panel-init-effect-trigger')

@Injectable()
export class SettingsEffects {
  hour = 0

  changeHour = this.ngZone.runOutsideAngular(() =>
    setInterval(() => {
      const hour = new Date().getHours()
      if (hour !== this.hour) {
        this.hour = hour
        this.ngZone.run(() => this.store.dispatch(actionSettingsChangeHour({ hour })))
      }
    }, 60_000)
  )

  persistSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSettingsChangeAnimationsElements, actionSettingsChangeAnimationsPage, actionSettingsChangeAnimationsPageDisabled, actionSettingsChangeAutoNightMode, actionSettingsChangeLanguage, actionSettingsChangeStickyHeader, actionSettingsChangeTheme, actionSettingsChangeSidebar,actionSettingsChangeSidebarType,actionSettingsChangeNavbarType, actionSettingsChangeProfileMenu, actionSettingsChangeInputVariant, actionSettingsChangeInputLabelPosition, actionSettingsChangeMobileSidebar, actionSettingsChangeDirection, actionSettingsLoading, actionSettingsAddInProgressApi, actionSettingsRemoveInProgressApi,actionSettingsDarkMode, actionSettingsSetNotifications),
        withLatestFrom(this.store.pipe(select(selectSettingsState))),
        tap(([action, settings]) => this.localStorageService.setItem(SETTINGS_KEY, settings))
      ),
    { dispatch: false }
  )

  updateRouteAnimationType = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(actionSettingsChangeAnimationsElements, actionSettingsChangeAnimationsPage))).pipe(
        withLatestFrom(combineLatest([this.store.pipe(select(selectPageAnimations)), this.store.pipe(select(selectElementsAnimations))])),
        tap(([action, [pageAnimations, elementsAnimations]]) => this.animationsService.updateRouteAnimationType(pageAnimations, elementsAnimations))
      ),
    { dispatch: false }
  )

  updateTheme = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(actionSettingsChangeTheme))).pipe(
        withLatestFrom(this.store.pipe(select(selectEffectiveTheme))),
        tap(([action, effectiveTheme]) => {

        })
      ),
    { dispatch: false }
  )

  setTranslateServiceLanguage = createEffect(
    () =>
      this.store.pipe(
        select(selectSettingsLanguage),
        distinctUntilChanged(),
        tap(language => {
          this.translateService.use(language)
        })
      ),
    { dispatch: false }
  )

  setTitle = createEffect(
    () =>
      merge(this.actions$.pipe(ofType(actionSettingsChangeLanguage)), this.router.events.pipe(filter(event => event instanceof ActivationEnd))).pipe(
        tap(() => {
          // this.titleService.setTitle(this.router.routerState.snapshot.root, this.translateService)
        })
      ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private router: Router,
    // private _api: ApiService,
    private localStorageService: LocalStorageService,
    private animationsService: AnimationsService,
    private translateService: TranslateService,
    private breadcrumbFacade: BreadcrumbFacade,
    private ngZone: NgZone
  ) {}
}
