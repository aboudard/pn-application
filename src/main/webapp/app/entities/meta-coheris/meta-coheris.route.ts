import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMetaCoheris, MetaCoheris } from 'app/shared/model/meta-coheris.model';
import { MetaCoherisService } from './meta-coheris.service';
import { MetaCoherisComponent } from './meta-coheris.component';
import { MetaCoherisDetailComponent } from './meta-coheris-detail.component';
import { MetaCoherisUpdateComponent } from './meta-coheris-update.component';

@Injectable({ providedIn: 'root' })
export class MetaCoherisResolve implements Resolve<IMetaCoheris> {
  constructor(private service: MetaCoherisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMetaCoheris> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((metaCoheris: HttpResponse<MetaCoheris>) => {
          if (metaCoheris.body) {
            return of(metaCoheris.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MetaCoheris());
  }
}

export const metaCoherisRoute: Routes = [
  {
    path: '',
    component: MetaCoherisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaCoheris.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MetaCoherisDetailComponent,
    resolve: {
      metaCoheris: MetaCoherisResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaCoheris.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MetaCoherisUpdateComponent,
    resolve: {
      metaCoheris: MetaCoherisResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaCoheris.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MetaCoherisUpdateComponent,
    resolve: {
      metaCoheris: MetaCoherisResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaCoheris.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
