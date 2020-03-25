import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDocFlux, DocFlux } from 'app/shared/model/doc-flux.model';
import { DocFluxService } from './doc-flux.service';
import { DocFluxComponent } from './doc-flux.component';
import { DocFluxDetailComponent } from './doc-flux-detail.component';
import { DocFluxUpdateComponent } from './doc-flux-update.component';

@Injectable({ providedIn: 'root' })
export class DocFluxResolve implements Resolve<IDocFlux> {
  constructor(private service: DocFluxService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocFlux> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((docFlux: HttpResponse<DocFlux>) => {
          if (docFlux.body) {
            return of(docFlux.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DocFlux());
  }
}

export const docFluxRoute: Routes = [
  {
    path: '',
    component: DocFluxComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.docFlux.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DocFluxDetailComponent,
    resolve: {
      docFlux: DocFluxResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.docFlux.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DocFluxUpdateComponent,
    resolve: {
      docFlux: DocFluxResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.docFlux.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DocFluxUpdateComponent,
    resolve: {
      docFlux: DocFluxResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.docFlux.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
