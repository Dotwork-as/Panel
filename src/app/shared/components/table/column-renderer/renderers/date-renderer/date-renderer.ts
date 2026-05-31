import { ChangeDetectionStrategy, Component, Injector, Input } from '@angular/core'
import { IColumn } from '@shared/components/table/table'
import { select, Store } from '@ngrx/store'
import { AppState } from '@core/core.state'
import { selectSettingsLanguage } from '@core/settings/settings.selectors'
import { Utility } from '@shared/services/utility'
import { AsyncPipe } from '@angular/common'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'date-renderer',
  imports: [AsyncPipe],
  template: ` <span dir="ltr">{{ transform(data[col.field], language$ | async) }}</span> `
})
export class DateRenderer extends Utility {
  @Input() data: any
  @Input() col: IColumn
  language$ = this.store.pipe(select(selectSettingsLanguage))

  constructor(
    private store: Store<AppState>,
    injector: Injector
  ) {
    super(injector)
  }

  transform(value: any, lang: string) {
    return this.convertDate(value, true)
  }
}
