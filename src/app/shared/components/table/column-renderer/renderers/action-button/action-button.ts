import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { IActionButton, IColumn, ITableSetting } from '@shared/components/table/table'
import { BehaviorSubject, Observable } from 'rxjs'
import { PermissionService } from '@shared/services/permission/permission.service'
import { select, Store } from '@ngrx/store'
import { selectSettingsLanguage } from '@core/settings/settings.selectors'
import { AppState } from '@core/core.state'
import { AsyncPipe, NgForOf, NgIf } from '@angular/common'
import { Tooltip } from 'primeng/tooltip'
import { HasPermissionDirective } from '@shared/services/permission/permission.directive'
import { IconDirective } from '@shared/directives/icon.directive'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'action-button-renderer',
  template: `
    <div class="action-button">
      <ng-container *ngFor="let item of actionButton$ | async">
        <span (click)="clicked(item, col, data)" *ngIf="!item?.is_hidden" [pTooltip]="item?.options?.tooltip">
          <i [style]="data[item?.options?.styleField]" class="{{ data[item?.options?.classField] }} {{ inserClass(item.button) }}" [icon-name]="rewriteIcon(item.button)" [class.disabled]="item?.disabled"></i>
        </span>
      </ng-container>
    </div>
  `,
  imports: [NgIf, AsyncPipe, Tooltip, NgForOf, IconDirective],
  styleUrls: ['./action-button.scss']
})
export class ActionButton implements OnInit {
  @Input() data: any
  @Input() col: IColumn
  @Input() setting: ITableSetting
  @Input() index: number
  language$: Observable<string> = this.store.pipe(select(selectSettingsLanguage))

  actionButton$ = new BehaviorSubject<IActionButton[]>([])

  constructor(
    private _permissionService: PermissionService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    let action_buttons = this.setting?.actionButton?.map(button => {
      return {
        ...button,
        icon: button?.options?.classField || this.rewriteIcon(button.button),
        command: () => {
          this.clicked(button, this.col, this.data)
        },
        style: button?.options?.styleField,
        is_hidden: button.is_hidden,
        disabled: button.disabled || false,
        tooltipOptions: {
          tooltipLabel: button?.options?.tooltip,
          tooltipPosition: 'top'
        }
      }
    })
    this.actionButton$.next(action_buttons || [])
  }

  clicked(item, col, data) {
    this.setting.onClick(item.button, col, data, this.index)
  }

  rewriteIcon(button): string {
    switch (button) {
      case 'delete':
        return 'delete'
      case 'edit':
        return 'edit_square'
      case 'copy':
        return 'content_copy'
      case 'password':
        return 'key'
      case 'export':
        return 'file_export'
      case 'change_national_code':
        return 'icon icon-change'
      case 'view':
        return 'content_paste_search'
      case 'flow':
        return 'icon icon-flow-sheet'
      case 'settings':
        return 'settings'
      case 'upload':
        return 'upload'
      case 'permission':
        return 'key'
      case 'comment':
        return 'chat'
      default:
        return ''
    }
  }

  inserClass(button): string {
    switch (button) {
      case 'delete':
        return 'text-danger-500'
      case 'edit':
        return 'text-info-500'
      case 'copy':
        return ''
      case 'password':
        return ''
      case 'export':
        return ''
      case 'change_national_code':
        return ''
      case 'view':
        return ''
      case 'flow':
        return ''
      case 'comment':
        return ''
      default:
        return ''
    }
  }
}
