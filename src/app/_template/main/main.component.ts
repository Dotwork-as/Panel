import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { NavbarComponent } from '@shared/components/navbar/navbar.component'
import { SidebarComponent } from '@shared/components/sidebar/sidebar.component'
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component'
import { AnimateOnScroll } from 'primeng/animateonscroll'

@Component({
  imports: [NavbarComponent, RouterOutlet, SidebarComponent, AnimateOnScroll,BreadcrumbComponent],
  templateUrl: './main.component.html'
})
export class MainComponent {}
