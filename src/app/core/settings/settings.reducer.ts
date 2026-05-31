import { SettingsState, NIGHT_MODE_THEME } from './settings.model';
import {
  actionSettingsAddInProgressApi,
  actionSettingsChangeAnimationsElements,
  actionSettingsChangeAnimationsPage,
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeAutoNightMode,
  actionSettingsChangeDirection,
  actionSettingsChangeHour, actionSettingsChangeInputLabelPosition, actionSettingsChangeInputVariant,
  actionSettingsChangeLanguage,
  actionSettingsChangeMobileSidebar, actionSettingsChangeProfileMenu,
  actionSettingsChangeSidebar, actionSettingsChangeSidebarType, actionSettingsChangeNavbarType,
  actionSettingsChangeStickyHeader,
  actionSettingsChangeTheme, actionSettingsDarkMode,
  actionSettingsGenerateCaptcha,
  actionSettingsGeneratedCaptcha,
  actionSettingsLoading,
  actionSettingsRemoveInProgressApi, actionSettingsSetNotifications
} from './settings.actions'
import { Action, createReducer, on } from '@ngrx/store';

export const initialState: SettingsState = {
  language: 'en',
  theme: 'dark',
  autoNightMode: true,
  nightTheme: NIGHT_MODE_THEME,
  dark: true,
  stickyHeader: true,
  pageAnimations: true,
  pageAnimationsDisabled: false,
  elementsAnimations: true,
  hour: 0,
  sidebar_type: 'slim+',
  navbar_type: 'spaceBetween',
  profile_menu: 'end',
  input_variant: 'filled',
  input_label_position: 'over',
  show_sidebar: true,
  show_mobile_sidebar: false,
  rtl: false,
  show_loading: false,
  inProgressApi: [],
  notifications: [],
  captcha: {
    captcha: '',
    type: '',
    id: ''
  }
};

const reducer = createReducer(
  initialState,
  on(
    actionSettingsChangeLanguage,
    actionSettingsChangeTheme,
    actionSettingsDarkMode,
    actionSettingsChangeAutoNightMode,
    actionSettingsChangeStickyHeader,
    actionSettingsChangeAnimationsPage,
    actionSettingsChangeAnimationsElements,
    actionSettingsChangeHour,
    actionSettingsChangeSidebar,
    actionSettingsChangeSidebarType,
    actionSettingsChangeNavbarType,
    actionSettingsChangeProfileMenu,
    actionSettingsChangeInputVariant,
    actionSettingsChangeInputLabelPosition,
    actionSettingsChangeMobileSidebar,
    actionSettingsChangeDirection,
    actionSettingsLoading,
    actionSettingsSetNotifications,
    (state, action) => ({ ...state, ...action })
  ),
  on(
    actionSettingsChangeAnimationsPageDisabled,
    (state, { pageAnimationsDisabled }) => ({
      ...state,
      pageAnimationsDisabled,
      pageAnimations: false
    })
  ),
  on(actionSettingsGenerateCaptcha, (state) => ({
    ...state,
  })),
  on(actionSettingsAddInProgressApi, (state, {apiKey}) => {
    let inProgressApi: string[] = [];
    if (!((state?.inProgressApi||[])?.find(key => key == apiKey))) {
      inProgressApi = (state?.inProgressApi||[]).concat(apiKey)
    }
    return {
      ...state,
      inProgressApi: inProgressApi
    }
  }),
  on(actionSettingsRemoveInProgressApi, (state, {apiKey}) => {
    let inProgressApi: string[] = [...(state?.inProgressApi||[])].filter(key => key != apiKey)
    return {
      ...state,
      inProgressApi: inProgressApi
    }
  }),
  on(actionSettingsGeneratedCaptcha, (state, { data }) => ({
    ...state,
    captcha: {
      captcha:  "data:image/png;base64," + data?.captcha?.data,
      type: data?.type,
      id: data?.captcha?.id
    }
  }))
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
