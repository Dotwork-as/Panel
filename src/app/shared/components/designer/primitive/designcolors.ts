import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { DesignerService } from '@shared/services/designerservice';
import { palette } from '@primeng/themes'
import { DesignColorPalette } from '../app.designcolorpalette.component';
import  config from '../../../../../../theme.json'
import  {ThemeService} from '../../../../theme/theme.service'

@Component({
    selector: 'design-colors',
    standalone: true,
    imports: [CommonModule, FieldsetModule, FormsModule, DesignColorPalette],
    template: ` <p-fieldset legend="Colors" [toggleable]="true">
        <ng-container *ngFor="let key of objectKeys(themeService.config.colors)">
            <section class="flex justify-between items-center mb-4" *ngIf="key != 'surface_light' && key != 'surface_dark'">
                <div class="flex gap-2 items-center">
                    <span class="text-sm capitalize block w-20">{{ key }}</span>
                    <input [value]="themeService.config.colors[key]['500']" (input)="onColorChange($event, key)" type="color" />
                </div>
                <design-color-palette [value]="themeService.config.colors[key]" />
            </section>
        </ng-container>
    </p-fieldset>`
})
export class DesignColors {
    onColorChange(event, color) {
      config.colors[color] = palette(event.target.value);
      this.themeService.saveTheme({...this.themeService.config, colors: config.colors})
    }

    designerService = inject(DesignerService);
    themeService = inject(ThemeService);

    objectKeys = Object.keys;

  protected readonly config = config
}
