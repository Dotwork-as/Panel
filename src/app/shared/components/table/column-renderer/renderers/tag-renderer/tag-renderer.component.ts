import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {IColumn, ITableSetting} from "@shared/components/table/table";
import { NgForOf, NgIf } from '@angular/common'
import { Tag } from 'primeng/tag'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'tag-renderer',
  template: `
    <ng-template [ngIf]="data[col.field]?.length > 0" [ngIfElse]="noData">
      <ng-container *ngFor="let field of [].concat(data[col.field])">
        <p-tag [rounded]="col.renderer_option?.rounded"
               [styleClass]="data[col.renderer_option?.classField] + ' me-1 ' + field?.class" [value]="field.label|translate">
        </p-tag>
      </ng-container>
    </ng-template>
    <ng-template #noData>-</ng-template>
  `,
  imports: [
    NgIf,
    Tag,
    TranslatePipe,
    NgForOf
  ]
})

export class TagRendererComponent {
  @Input() data: any;
  @Input() col: IColumn;
  @Input() setting: ITableSetting;
}
