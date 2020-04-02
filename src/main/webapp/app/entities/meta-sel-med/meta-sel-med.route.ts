import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMetaSelMed, MetaSelMed } from 'app/shared/model/meta-sel-med.model';
import { MetaSelMedService } from './meta-sel-med.service';
import { MetaSelMedComponent } from './meta-sel-med.component';
import { MetaSelMedDetailComponent } from './meta-sel-med-detail.component';
import { MetaSelMedUpdateComponent } from './meta-sel-med-update.component';

@Injectable({ providedIn: 'root' })
export class MetaSelMedResolve implements Resolve<IMetaSelMed> {
  constructor(private service: MetaSelMedService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMetaSelMed> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((metaSelMed: HttpResponse<MetaSelMed>) => {
          if (metaSelMed.body) {
            return of(metaSelMed.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MetaSelMed());
  }
}

export const metaSelMedRoute: Routes = [
  {
    path: '',
    component: MetaSelMedComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaSelMed.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MetaSelMedDetailComponent,
    resolve: {
      metaSelMed: MetaSelMedResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaSelMed.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MetaSelMedUpdateComponent,
    resolve: {
      metaSelMed: MetaSelMedResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaSelMed.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MetaSelMedUpdateComponent,
    resolve: {
      metaSelMed: MetaSelMedResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaSelMed.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
