import { Component, Input, OnInit , ChangeDetectionStrategy} from '@angular/core';
import {IColumn, ITableSetting} from "@shared/components/table/table";
import { Ripple } from 'primeng/ripple'
import { NgForOf } from '@angular/common'
import { TranslateDirective } from '@ngx-translate/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'button-renderer',
  imports: [
    Ripple,
    NgForOf,
    TranslateDirective
  ],
  template: `
    <ng-container *ngFor="let button of data[col.field]">
      <button pRipple class="btn {{button?.class}}" [translate]="'table.column.'+button.label"
              (click)="clicked(setting, col, data)"></button>
    </ng-container>
  `
})
export class ButtonRenderer {
  @Input() col: IColumn;
  @Input() setting: ITableSetting;
  @Input() data: any;
  @Input() rendererOption;

  clicked(item, col, data) {
    if (item && item.onClick && item.onClick instanceof Function) {
      this.setting?.onClick(col.field, col, data);
    }
  }

}
