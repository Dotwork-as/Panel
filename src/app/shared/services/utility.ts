import { ChangeDetectorRef, Injector, NgZone } from '@angular/core'
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationService } from '@shared/services/notification.service'
import { ApiService } from '@shared/services/api.service'
import { TableFacade } from '@shared/components/table/+state/table.facade'
import { DialogService } from '@shared/services/dialog.service'
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service'
import moment from 'jalali-moment'
import { TranslateService } from '@ngx-translate/core'
import { Location } from '@angular/common'
import { PermissionService } from '@shared/services/permission/permission.service'
import { GenerateTitleService } from './generate-title.service'
import { Title } from '@angular/platform-browser'
import { environment } from '@env/environment'
// import introJs from 'intro.js'
import { switchMap, take } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { selectInputLabelPosition, selectSettingsInProgressApi } from '@core/settings/settings.selectors'
import { AppState } from '@core/core.state'

export class Utility {
  protected router: Router
  protected route: ActivatedRoute
  protected fb: FormBuilder
  protected notify: NotificationService
  protected api: ApiService
  protected tableFacade: TableFacade
  protected dialogService: DialogService
  protected storageService: LocalStorageService
  protected translate: TranslateService
  protected ngZone: NgZone
  protected permissionService: PermissionService
  protected location: Location
  protected generateTitle: GenerateTitleService
  protected title: Title
  protected cd: ChangeDetectorRef
  protected appstore: Store<AppState>
  protected floatType: 'in' | 'over' | 'on'

  inProgressApi$: Observable<string[]>

  constructor(injector: Injector) {
    this.router = injector.get(Router)
    this.route = injector.get(ActivatedRoute)
    this.fb = injector.get(FormBuilder)
    this.notify = injector.get(NotificationService)
    this.api = injector.get(ApiService)
    this.tableFacade = injector.get(TableFacade)
    this.dialogService = injector.get(DialogService)
    this.storageService = injector.get(LocalStorageService)
    this.translate = injector.get(TranslateService)
    this.ngZone = injector.get(NgZone)
    this.location = injector.get(Location)
    this.permissionService = injector.get(PermissionService)
    this.generateTitle = injector.get(GenerateTitleService)
    this.title = injector.get(Title)
    this.appstore = injector.get(Store<AppState>)
    this.cd = injector.get(ChangeDetectorRef)
    this.inProgressApi$ = this.appstore.pipe(select(selectSettingsInProgressApi))
    if (this.route?.routeConfig?.data?.['tour_page_name']) {
      document.body.setAttribute('page-name', this.route.routeConfig.data?.['tour_page_name'])
    }
    this.appstore.pipe(select(selectInputLabelPosition)).subscribe(data => {
      this.floatType = data
    })
  }

  goTo(redirect: string) {
    this.router.navigate([redirect])
  }

  goBack() {
    this.location.back()
  }

  hasError(controlName: string, formGroup: FormGroup | AbstractControl, submitted = false, errorType = 'required'): boolean {
    const control: FormControl = formGroup.get(controlName) as FormControl
    // return ((control.dirty && control.invalid) || (control.invalid && submitted)) &&
    //   control.hasError(errorType);
    return control.invalid && submitted && control.hasError(errorType)
  }

  formArrayHasError(submitted = false, formArray?: FormArray, index?: number, controlName?: string, errorType = 'required'): boolean {
    let formControl: FormControl
    if (controlName) {
      formControl = formArray.at(index).get(controlName) as FormControl
    } else {
      formControl = formArray.at(index) as FormControl
    }
    return ((formControl.dirty && formControl.invalid) || (formControl.invalid && submitted)) && formControl.hasError(errorType)
  }

  hasValidator(controlName: string, formGroup: FormGroup | AbstractControl, validator = Validators.required) {
    return formGroup?.get(controlName)?.hasValidator(validator)
  }

  convertUnix(date) {
    return moment(date).format('x')
  }

  convertDate(date: string, time?: boolean): string {
    let lang = this.storageService.getItem('SETTINGS')?.lang || 'fa'
    let ts_date = moment(date).format('x')
    if (parseInt(ts_date) > 0) {
      switch (lang) {
        case 'fa': {
          time ? (date = moment(date).format('jYYYY-jMM-jDD HH:mm:ss')) : (date = moment(date).format('jYYYY/jMM/jDD'))
          break
        }
        case 'en': {
          time ? (date = moment(date).format('YYYY-MM-DD HH:mm:ss')) : (date = moment(date).format('YYYY/MM/DD'))
          break
        }
      }
    } else {
      date = null
    }
    return date
  }

  convertToTimePass(second: number): string {
    if (second < 0) return '0'
    let lang = this.storageService.getItem('SETTINGS')?.language

    let du = moment.duration(second, 'seconds'),
      years = du.years(),
      days = du.days(),
      months = du.months(),
      hours = du.hours() ? `${du.hours()} ساعت و ` : '',
      minutes = du.minutes() ? `${du.minutes()} دقیقه و ` : '',
      seconds = du.seconds() ? `${du.seconds()} تانیه ` : '',
      prevHours = '',
      yearsAgo = '',
      monthsAgo = '',
      daysAgo = ''
    switch (lang) {
      case 'fa':
        yearsAgo = years ? `${years} سال ` : ''
        monthsAgo = months ? `${months} ماه و` : ''
        daysAgo = days ? `${days} روز و ` : ''
        prevHours = yearsAgo + monthsAgo + daysAgo
        break
      case 'en':
        yearsAgo = years ? `${years} year(s)` : ''
        monthsAgo = months ? `${months} month(s)` : ''
        daysAgo = days ? `${days} day(s)` : ''
        prevHours = yearsAgo + monthsAgo + daysAgo
        break
      default:
        break
    }
    return `${prevHours} ${hours} ${minutes} ${seconds} `
  }

  convertToTimePassShort(date): string {
    if (date < 0) return '0'

    let time = moment(),
      endTime = moment(time),
      startTime = moment(date),
      dif = endTime.diff(startTime),
      du = moment.duration(dif),
      days = du.days(),
      hours = du.hours(),
      minutes = du.minutes(),
      seconds = du.seconds()

    let temp = []
    temp.push(days)
    temp.push(hours)
    temp.push(minutes)
    temp.push(seconds)
    temp = temp.map(e => {
      if (e < 10) {
        return '0' + e
      }
      return e.toString()
    })

    return temp.join(':')
  }

  checkDateValid(dateString) {
    return Math.floor(new Date(dateString).getTime() / 1000) > 0
  }

  convertUnixToDate(unix: number, time?: boolean): string {
    let lang = this.storageService.getItem('SETTINGS')?.language || 'fa'
    let date = '-'
    if (unix > 0) {
      switch (lang) {
        case 'fa':
          date = time ? moment.unix(unix).format('HH:mm:ss - jYYYY/jMM/jDD') : moment.unix(unix).format('jYYYY/jMM/jDD')
          break
        case 'en':
          date = time ? moment.unix(unix).format('YYYY/MM/DD - HH:mm:ss') : moment.unix(unix).format('YYYY/MM/DD')
          break
      }
    }
    return date
  }

  convertUnixToISO(unix): string {
    const unixLength = String(unix).length
    if (unixLength < 13) {
      unix = `${unix}${'0'.repeat(13 - unixLength)}`
    }
    return new Date(Number(unix)).toISOString()
  }

  setTitle(title: string) {
    const prefixTitle = this.translate.instant('app_name') || environment.appName || ''
    title = title ? `${prefixTitle} :: ${title}` : ''
    this.title.setTitle(title)
  }

  filterComplete(event, originalList: Observable<any>, filteredList: BehaviorSubject<object[]>, formGroup: FormGroup, ctrl_name: string, optionLabel = 'name', optionValue = 'id', multiple = true, formType: 'driven' | 'reactive' = 'reactive', ngModel?) {
    let selectedItems: object[] = []
    let selectedItem: any = null
    let filtered: any[] = []
    let query = event.query
    if (formType == 'reactive') {
      if (multiple) {
        selectedItems = formGroup.get(ctrl_name)?.value?.map(item => item?.[optionValue]) || []
      } else {
        selectedItem = formGroup.get(ctrl_name)?.value
      }
    } else {
      if (multiple) {
        selectedItems = ngModel?.value?.map(item => item?.[optionValue]) || []
      } else {
        selectedItem = ngModel
      }
    }

    originalList.pipe(take(1)).subscribe(items => {
      for (let i = 0; i < (items as any[])?.length; i++) {
        let item = (items as any[])[i]
        if (item?.[optionLabel].toLowerCase().includes(query.toLowerCase())) {
          if (multiple && !selectedItems.includes(item?.[optionValue])) {
            filtered.push(item)
          } else if (selectedItem?.value?.[optionValue] != item?.[optionValue] && multiple === false) {
            filtered.push(item)
          }
        }
      }
      filteredList.next(filtered)
    })
  }

  removeDuplicatesItems(data: any[], itemIdFromData = 'id', selfId = 'id') {
    return data.filter((item, index, self) => {
      return index === self.findIndex(e => e?.[selfId] == item?.[itemIdFromData])
    })
  }

  checkApiLoading(api_key: string): Observable<boolean> {
    return this.inProgressApi$.pipe(
      switchMap(data => {
        return new BehaviorSubject<boolean>(!!data?.includes(api_key))
      })
    )
  }

  hasTable = false
  getPagination(tblName: string) {
    const activePagination = this.storageService.getItem('active-table-pagination')
    const page = this.route.snapshot.queryParams?.page || 1
    const rows = this.route.snapshot.queryParams?.limit || 10
    if (tblName == activePagination?.tableName) {
      this.hasTable = true
      return {
        ...this.storageService.getItem('active-table-pagination'),
        page: parseInt(page),
        rows: parseInt(rows)
      }
    }
    setTimeout(() => {
      if (!this.hasTable) this.router.navigate([], { queryParams: { ...this.route.snapshot.queryParams, limit: undefined, page: undefined }, relativeTo: this.route })
    }, 100)
    return {
      page: 1,
      rows: 10
    }
  }
}
