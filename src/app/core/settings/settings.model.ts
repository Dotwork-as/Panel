import { AppState } from '../core.state';

export const NIGHT_MODE_THEME = 'BLACK-THEME';

export type Language = 'en' | 'fa';

export interface ICaptcha {
  captcha: string;
  id: string;
  type: string;
}

export interface SettingsState {
  language: string;
  theme: string;
  dark: boolean;
  autoNightMode: boolean;
  nightTheme: string;
  stickyHeader: boolean;
  pageAnimations: boolean;
  pageAnimationsDisabled: boolean;
  elementsAnimations: boolean;
  hour: number;
  sidebar_type: 'static'|'slim'|'slim+'|'horizontal'|'none';
  navbar_type: 'spaceBetween'| 'center';
  profile_menu: 'start' | 'end';
  input_variant: 'filled' | 'outlined';
  input_label_position: 'in' | 'on' | 'over';
  show_sidebar: boolean;
  show_mobile_sidebar: boolean;
  rtl: boolean;
  show_loading: boolean;
  captcha: ICaptcha;
  inProgressApi: string[];
  notifications: any[];
}


export interface State extends AppState {
  settings: SettingsState;
}
