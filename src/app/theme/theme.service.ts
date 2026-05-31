import { inject, Injectable } from '@angular/core'
import config from '../../../theme.json';
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service'

export interface IThemeConfig {
  menu_type: "static" | "slim" | "slim+" | "horizontal"|'none'
  navbar_type: 'spaceBetween' | 'center'
  profile_menu: 'start' | 'end'
  input_variant: 'filled' | 'outlined'
  input_label_position: 'in' | 'on' | 'over'
  primeng: any
  colors: any
  tokens: any
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(private _storage: LocalStorageService) {
    this._storage.setItem('theme', config)
  }

  get config(): IThemeConfig {
    return this._storage.getItem("theme")
  }

  saveTheme(c: IThemeConfig) {
    this._storage.setItem('theme', c)
    for (const [colorName, shades] of Object.entries(c.colors)) {
      for (const [shade, value] of Object.entries(shades)) {
        document.documentElement.style.setProperty(`--color-${colorName}-${shade}`, value);
      }
    }
  }

}
