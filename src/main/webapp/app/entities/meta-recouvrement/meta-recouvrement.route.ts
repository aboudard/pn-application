import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMetaRecouvrement, MetaRecouvrement } from 'app/shared/model/meta-recouvrement.model';
import { MetaRecouvrementService } from './meta-recouvrement.service';
import { MetaRecouvrementComponent } from './meta-recouvrement.component';
import { MetaRecouvrementDetailComponent } from './meta-recouvrement-detail.component';
import { MetaRecouvrementUpdateComponent } from './meta-recouvrement-update.component';

@Injectable({ providedIn: 'root' })
export class MetaRecouvrementResolve implements Resolve<IMetaRecouvrement> {
  constructor(private service: MetaRecouvrementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMetaRecouvrement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((metaRecouvrement: HttpResponse<MetaRecouvrement>) => {
          if (metaRecouvrement.body) {
            return of(metaRecouvrement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MetaRecouvrement());
  }
}

export const metaRecouvrementRoute: Routes = [
  {
    path: '',
    component: MetaRecouvrementComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaRecouvrement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MetaRecouvrementDetailComponent,
    resolve: {
      metaRecouvrement: MetaRecouvrementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaRecouvrement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MetaRecouvrementUpdateComponent,
    resolve: {
      metaRecouvrement: MetaRecouvrementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaRecouvrement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MetaRecouvrementUpdateComponent,
    resolve: {
      metaRecouvrement: MetaRecouvrementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaRecouvrement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
