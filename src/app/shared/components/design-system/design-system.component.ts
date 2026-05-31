import { AfterContentInit, Component, HostListener, Injector, OnInit } from '@angular/core'
import { Card } from 'primeng/card'
import { InputText } from 'primeng/inputtext'
import { FloatLabel } from 'primeng/floatlabel'
import { Utility } from '@shared/services/utility'
import { Button } from 'primeng/button'
import { Divider } from 'primeng/divider'
import { IconDirective } from '@shared/directives/icon.directive'
import { TableComponent } from '@shared/components/table/table.component'
import { BehaviorSubject } from 'rxjs'
import { ITable } from '@shared/components/table/table'
import { PrimeCalendar } from '@shared/components/prime-calendar/prime-calendar'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { InputNumber } from 'primeng/inputnumber'
import { HighchartsChartModule } from 'highcharts-angular'
import Highcharts from 'highcharts'
import { NgClass, NgIf } from '@angular/common'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs'
import { Slider } from 'primeng/slider'
import { Message } from 'primeng/message'
import { RadioButton } from 'primeng/radiobutton'
import { Checkbox } from 'primeng/checkbox'
import { AnimateOnScroll } from 'primeng/animateonscroll'
import { Password } from 'primeng/password'
import { Select } from 'primeng/select'
import { MultiSelect } from 'primeng/multiselect'
import { Dialog } from 'primeng/dialog'
import { TranslatePipe } from '@ngx-translate/core'

@Component({
  imports: [Card, InputText, FloatLabel, Button, Divider, IconDirective, ReactiveFormsModule, PrimeCalendar, TableComponent, InputNumber, HighchartsChartModule, NgIf, TabList, Tabs, Tab, TabPanels, TabPanel, Slider, FormsModule, Message, RadioButton, Checkbox, AnimateOnScroll, Password, Select, MultiSelect, Dialog, NgClass],
  templateUrl: './design-system.component.html'
})
export class DesignSystemComponent extends Utility implements OnInit {
  Highcharts: typeof Highcharts = Highcharts
  chartOptions: Highcharts.Options = null
  sliderValue = 50
  checkBoxValue = 'Normal'
  radioValue = 'Normal'
  isMobile = false

  options = [
    { key: 'Option 1', value: '1' },
    { key: 'Option 2', value: '2' }
  ]

  dialog: boolean = false

  @HostListener('window:resize')
  onResize() {
    this.checkIfMobile()
  }

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {
    setTimeout(_ => {
      this.chartOptions = {
        colors: ['var(--color-primary-300)', 'var(--color-primary-500)', 'var(--color-primary-700)'],
        chart: {
          type: 'column',
          spacing: [0, 0, 0, 0],
          backgroundColor: 'transparent',
          plotBackgroundColor: 'transparent',
          plotBorderWidth: 0,
          plotShadow: true,
          height: 200
        },
        title: {
          text: ''
        },
        xAxis: {
          gridLineWidth: 0,
          lineWidth: 0,
          tickWidth: 0,
          labels: {
            enabled: false
          },
          accessibility: {
            description: null
          }
        },
        yAxis: {
          min: 0,
          gridLineWidth: 0,
          labels: {
            enabled: false
          },
          title: { text: null }
        },
        tooltip: {
          valueSuffix: ' (1000 MT)',
          enabled: false
        },
        plotOptions: {
          column: {
            borderWidth: 0,
            groupPadding: 0,
            borderRadius: 10,
            colorByPoint: true,
            showInLegend: false,
            maxPointWidth: 0,
            pointPadding: 0,
            pointWidth: 10
          }
        },
        series: [
          {
            type: 'column',
            name: 'Corn',
            data: [280000, 129000, 54000, 129000, 64300, 54000, 34300, 387749, 280000, 280000, 129000, 64300, 129000, 64300, 34300, 387749, 280000, 54000, 34300]
          }
        ]
      }
    }, 10)
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 768
  }

  showConfirmDialog() {
    this.dialogService.confirm({
      message: 'feedback.are_you_sure',
      header: 'forms.delete',
      acceptLabel: 'feedback.yes',
      rejectLabel: 'feedback.no',
      accept: () => {},
      reject: () => {}
    })
  }

  tableName = 'test'
  dataTable$ = new BehaviorSubject([
    {
      id: 1,
      name: 'DOT',
      active: false,
      role: [{ label: 'Support', value: 'Support', class: 'bg-surface-500' }]
    },
    {
      id: 2,
      name: 'WORK',
      active: true,
      role: [
        { label: 'Administrator', value: 'Administrator', class: 'bg-success-500' },
        { label: 'User', value: 'User', class: 'bg-red-500' }
      ]
    }
  ])
  tableSetting$: BehaviorSubject<ITable> = new BehaviorSubject<ITable>({
    columns: [
      {
        label: 'name',
        field: 'name'
      },
      {
        label: 'role',
        field: 'role',
        renderer: 'tag',
        filter: {
          type: 'dropdown',
          key: 'role',
          option: {
            data: new BehaviorSubject([
              { label: 'Administrator', value: 'Administrator' },
              { label: 'Support', value: 'Support' },
              { label: 'User', value: 'User' }
            ]),
            optionLabel: 'label',
            optionValue: 'value'
          }
        },
        with: 20
      },
      {
        label: 'status',
        field: 'active',
        renderer: 'boolean',
        with: 0
      },
      {
        label: 'action_button',
        field: 'action_button',
        renderer: 'action_button',
        with: 0
      }
    ],
    setting: {
      tableName: this.tableName,
      pagination: true,
      globalFilter: true,
      reorder: true,
      reOrderColumns: true,
      toggleColumns: true,
      selection: true,
      clickableRow: true,
      actionButton: [
        {
          button: 'edit'
        },
        {
          button: 'delete'
        }
      ],
      onClick: (button, col, data, i) => {
        switch (button) {
          case 'delete': {
            break
          }
          case 'edit': {
            break
          }
        }
      }
    },
    mapData: (item: any) => {
      return {
        ...item
      }
    }
  })
}
