import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core'
import { IColumn, ITableSetting } from '@shared/components/table/table'
import { BehaviorSubject } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { selectSettingsInProgressApi } from '@core/settings/settings.selectors'
import { AppState } from '@core/core.state'
import { BooleanRenderer } from '@shared/components/table/column-renderer/renderers/boolean-renderer/boolean-renderer'
import {
  TextColorRenderer
} from '@shared/components/table/column-renderer/renderers/text-color-renderer/text-color-renderer'
import { ButtonRenderer } from '@shared/components/table/column-renderer/renderers/button-renderer/button-renderer'
import { DateRenderer } from '@shared/components/table/column-renderer/renderers/date-renderer/date-renderer'
import {
  DropdownRenderer
} from '@shared/components/table/column-renderer/renderers/dropdown-renderer/dropdown-renderer'
import {
  TagRendererComponent
} from '@shared/components/table/column-renderer/renderers/tag-renderer/tag-renderer.component'
import { AsyncPipe, JsonPipe, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common'
import {
  IconRendererComponent
} from '@shared/components/table/column-renderer/renderers/icon-renderer/icon-renderer.component'
import { ToggleRenderer } from '@shared/components/table/column-renderer/renderers/toggle-renderer/toggle'
import { ActionButton } from '@shared/components/table/column-renderer/renderers/action-button/action-button'
import { LinkRenderer } from '@shared/components/table/column-renderer/renderers/link-renderer/link-renderer'
import {
  ThumbnailRenderer
} from '@shared/components/table/column-renderer/renderers/thumbnail-renderer/thumbnail-renderer'
import {
  RelatedQuestionRenderer
} from '@shared/components/table/column-renderer/renderers/related-question-renderer/related-question-renderer'
import { Skeleton } from 'primeng/skeleton'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'column-renderer',
  templateUrl: './column-renderer.component.html',
  imports: [
    BooleanRenderer,
    TextColorRenderer,
    ButtonRenderer,
    DateRenderer,
    DropdownRenderer,
    TagRendererComponent,
    NgSwitch,
    NgIf,
    AsyncPipe,
    IconRendererComponent,
    ToggleRenderer,
    ActionButton,
    LinkRenderer,
    ThumbnailRenderer,
    RelatedQuestionRenderer,
    Skeleton,
    NgSwitchCase,
    NgSwitchDefault
  ],
  styleUrls: ['./column-renderer.component.scss']
})
export class ColumnRendererComponent implements OnInit {
  @Input() index: number
  @Input() data: any
  @Input() column: IColumn
  @Input() setting: ITableSetting
  @Input() hoverIndex: number
  @Input() loading$ = new BehaviorSubject<boolean>(false)
  inProgressApis$ = this._store.pipe(select(selectSettingsInProgressApi))

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {}
}
