import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMetaSIRH, MetaSIRH } from 'app/shared/model/meta-sirh.model';
import { MetaSIRHService } from './meta-sirh.service';
import { MetaSIRHComponent } from './meta-sirh.component';
import { MetaSIRHDetailComponent } from './meta-sirh-detail.component';
import { MetaSIRHUpdateComponent } from './meta-sirh-update.component';

@Injectable({ providedIn: 'root' })
export class MetaSIRHResolve implements Resolve<IMetaSIRH> {
  constructor(private service: MetaSIRHService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMetaSIRH> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((metaSIRH: HttpResponse<MetaSIRH>) => {
          if (metaSIRH.body) {
            return of(metaSIRH.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MetaSIRH());
  }
}

export const metaSIRHRoute: Routes = [
  {
    path: '',
    component: MetaSIRHComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaSIRH.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MetaSIRHDetailComponent,
    resolve: {
      metaSIRH: MetaSIRHResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaSIRH.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MetaSIRHUpdateComponent,
    resolve: {
      metaSIRH: MetaSIRHResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaSIRH.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MetaSIRHUpdateComponent,
    resolve: {
      metaSIRH: MetaSIRHResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaSIRH.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
