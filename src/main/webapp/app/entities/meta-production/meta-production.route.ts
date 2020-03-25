import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMetaProduction, MetaProduction } from 'app/shared/model/meta-production.model';
import { MetaProductionService } from './meta-production.service';
import { MetaProductionComponent } from './meta-production.component';
import { MetaProductionDetailComponent } from './meta-production-detail.component';
import { MetaProductionUpdateComponent } from './meta-production-update.component';

@Injectable({ providedIn: 'root' })
export class MetaProductionResolve implements Resolve<IMetaProduction> {
  constructor(private service: MetaProductionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMetaProduction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((metaProduction: HttpResponse<MetaProduction>) => {
          if (metaProduction.body) {
            return of(metaProduction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MetaProduction());
  }
}

export const metaProductionRoute: Routes = [
  {
    path: '',
    component: MetaProductionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaProduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MetaProductionDetailComponent,
    resolve: {
      metaProduction: MetaProductionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaProduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MetaProductionUpdateComponent,
    resolve: {
      metaProduction: MetaProductionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaProduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MetaProductionUpdateComponent,
    resolve: {
      metaProduction: MetaProductionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaProduction.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
