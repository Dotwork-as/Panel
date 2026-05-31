import { Injectable } from '@angular/core'
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service'
import { FeaturesConstant } from '@shared/services/permission/features.constant'
import { NotificationService } from '@shared/services/notification.service'

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(
    private _localStorage: LocalStorageService,
    private _notify: NotificationService
  ) {}

  featuresConstant = FeaturesConstant

  get features(): { name: string; actions: string[] }[] {
    let features: { name: string; actions: string[] }[] = []

    const roles: any[] = this._localStorage.getItem('userInfo')?.user?.roles || []

    roles.forEach(role => {
      ;(role.permissions || []).forEach((perm: any) => {
        features.push({
          name: perm.entity,
          actions: perm.actions
        })
      })
    })

    return features
  }

  checkAccess(accessList: { [key: string]: string[] }, toast = false): boolean {
    if (this.checkUserType().includes('super_admin') || this.checkUserType().includes('admin')) {
      return true
    }

    let allowable = false
    this.features
      .filter(feature => Object.keys(accessList || {}).includes(feature.name))
      .forEach(feature => {
        accessList[feature.name].forEach(action => {
          if (feature.actions.includes(action)) {
            allowable = true
          }
        })
      })

    if (!allowable && toast) {
      this._notify.error({ message: 'feedback.access_error' })
    }

    return allowable
  }

  checkUserType(): ('super_admin' | 'admin' | 'user')[] {
    const user = this._localStorage.getItem('userInfo')?.user
    const types = []
    if (user?.isSuperAdmin) types.push('super_admin')
    else if (user?.isAdmin) types.push('admin')
    else types.push('user')
    return types
  }

  checkAccessToModule(moduleName: string) {
    return (this._localStorage.getItem('app-setting')?.access || []).includes(moduleName)
  }

  isLoggedUser() {
    return this._localStorage.getItem('user')?.user?.token
  }
}
