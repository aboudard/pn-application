import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMetaVie, MetaVie } from 'app/shared/model/meta-vie.model';
import { MetaVieService } from './meta-vie.service';
import { MetaVieComponent } from './meta-vie.component';
import { MetaVieDetailComponent } from './meta-vie-detail.component';
import { MetaVieUpdateComponent } from './meta-vie-update.component';

@Injectable({ providedIn: 'root' })
export class MetaVieResolve implements Resolve<IMetaVie> {
  constructor(private service: MetaVieService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMetaVie> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((metaVie: HttpResponse<MetaVie>) => {
          if (metaVie.body) {
            return of(metaVie.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MetaVie());
  }
}

export const metaVieRoute: Routes = [
  {
    path: '',
    component: MetaVieComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaVie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MetaVieDetailComponent,
    resolve: {
      metaVie: MetaVieResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaVie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MetaVieUpdateComponent,
    resolve: {
      metaVie: MetaVieResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaVie.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MetaVieUpdateComponent,
    resolve: {
      metaVie: MetaVieResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.metaVie.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
