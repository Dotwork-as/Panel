import { Component, Input, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { NgIf } from '@angular/common'
import { IconDirective } from '@shared/directives/icon.directive'

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'boolean-renderer',
  template: `
    <ng-template [ngIf]="data" [ngIfElse]="uncheck">
      <i icon-name="check_circle" class="text-success-500"></i>
    </ng-template>
    <ng-template #uncheck>
      <i icon-name="cancel" class="text-danger-500"></i>
    </ng-template>
  `,
  imports: [
    NgIf,
    IconDirective
  ]
})
export class BooleanRenderer {
  @Input() data: any;
}
