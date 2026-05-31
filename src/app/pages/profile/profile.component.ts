import { AsyncPipe } from '@angular/common'
import { Component, Injector, OnDestroy, OnInit } from '@angular/core'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { environment } from '@env/environment'
import { TranslatePipe } from '@ngx-translate/core'
import { Utility } from '@shared/services/utility'
import { Button } from 'primeng/button'
import { FloatLabel } from 'primeng/floatlabel'
import { Message } from 'primeng/message'
import { Password } from 'primeng/password'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [TranslatePipe, TabList, Tabs, Tab, TabPanels, TabPanel, AsyncPipe, ReactiveFormsModule]
})
export class ProfileComponent extends Utility implements OnInit, OnDestroy {
  public formGroup: FormGroup
  isTestEnv: boolean = environment.test
  submitted: boolean = false
  userData$ = new BehaviorSubject<any>({
    firstName: 'DOT',
    lastName: 'WORK',
    nationalCode: '001234567',
    email: 'dotwork.as@gmail.com',
    mobile: '+989123456789',
    username: 'DOT WORK'
  })

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
