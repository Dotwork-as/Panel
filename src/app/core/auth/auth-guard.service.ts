import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Store, select } from "@ngrx/store";

import { AppState } from "../core.state";
import { LocalStorageService } from '@shared/services/local-storage/local-storage.service'
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService {
  constructor(
    private store: Store<AppState>,
    private _router: Router,
    private _storage: LocalStorageService
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._storage.getItem("user")?.token) {
      return of(true);
    }

    this._router.navigate(["/auth"]);
    return of(false);
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._storage.getItem("user")?.token) {
      return of(true);
    }

    this._router.navigate(["/auth"]);
    return of(false);
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    if (this._storage.getItem("user")?.token) {
      return of(true);
    }

    this._router.navigate(["/auth"]);
    return of(false);
  }
}
