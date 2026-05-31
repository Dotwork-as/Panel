import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '@env/environment';

import { AppState } from '@core/core.state';
import {
  actionSettingsChangeInputLabelPosition,
  actionSettingsChangeInputVariant
} from '@core/settings/settings.actions';
import { selectInputVariant } from '@core/settings/settings.selectors';
import { select, Store } from '@ngrx/store';
import { AppDesignerComponent } from '@shared/components/designer/app.designer.component';
import { Utility } from '@shared/services/utility';
import { PrimeNG } from 'primeng/config';
import { Toast } from 'primeng/toast';
import { ThemeService } from './theme/theme.service';
import { ConfirmDialog } from 'primeng/confirmdialog'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, AppDesignerComponent,Toast,ConfirmDialog],
  standalone: true,
  host: {class: "w-full " + environment.iconType},
  providers: []
})
export class AppComponent extends Utility{


  constructor(private _config: PrimeNG, private _themeService: ThemeService, private store: Store<AppState>, injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    this.store.pipe(select(selectInputVariant)).subscribe(variant => this._config.inputVariant.set(variant))
    this.store.dispatch(actionSettingsChangeInputVariant({input_variant: this._themeService.config.input_variant}))
    this.store.dispatch(actionSettingsChangeInputLabelPosition({input_label_position: this._themeService.config.input_label_position}))
    this.translate.get('primeng').subscribe(res => this._config.setTranslation(res));
  }
}
