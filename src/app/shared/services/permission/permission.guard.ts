import { CanActivate, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of, Subject } from 'rxjs'
import { PermissionService } from '@shared/services/permission/permission.service'

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(
    private permissionService: PermissionService,
    private _router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const permission = route?.data?.['permission']
    const permission_module = route?.data?.['module']
    if (permission) {
      if (!this.permissionService.checkAccess(permission, true)) {
        this._router.navigate(['/403'])
        return of(this.permissionService.checkAccess(permission, true))
      }
    }
    if (permission_module) {
      if (!this.permissionService.checkAccessToModule(permission_module)) {
        this._router.navigate(['/403'])
        return of(!this.permissionService.checkAccessToModule(permission_module))
      }
    }

    return of(true)
  }
}
