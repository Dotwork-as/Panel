import { Routes } from '@angular/router'
import { MainComponent } from './_template/main/main.component'
import { PermissionGuard } from '@shared/services/permission/permission.guard'
import { AuthGuardService } from '@core/auth/auth-guard.service'

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'prefix',
    // canActivateChild: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'design-system',
        pathMatch: 'full'
      },
      {
        path: 'design-system',
        loadChildren: () => import('@shared/components/design-system/routes').then(r => r.routes)
      },
    ]
  },
  {
    path: 'auth',
    loadComponent: () => import('@pages/auth/auth.component').then(c => c.AuthComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
]
