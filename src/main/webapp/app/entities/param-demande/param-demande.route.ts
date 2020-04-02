import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IParamDemande, ParamDemande } from 'app/shared/model/param-demande.model';
import { ParamDemandeService } from './param-demande.service';
import { ParamDemandeComponent } from './param-demande.component';
import { ParamDemandeDetailComponent } from './param-demande-detail.component';
import { ParamDemandeUpdateComponent } from './param-demande-update.component';

@Injectable({ providedIn: 'root' })
export class ParamDemandeResolve implements Resolve<IParamDemande> {
  constructor(private service: ParamDemandeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParamDemande> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((paramDemande: HttpResponse<ParamDemande>) => {
          if (paramDemande.body) {
            return of(paramDemande.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ParamDemande());
  }
}

export const paramDemandeRoute: Routes = [
  {
    path: '',
    component: ParamDemandeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.paramDemande.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ParamDemandeDetailComponent,
    resolve: {
      paramDemande: ParamDemandeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.paramDemande.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ParamDemandeUpdateComponent,
    resolve: {
      paramDemande: ParamDemandeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.paramDemande.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ParamDemandeUpdateComponent,
    resolve: {
      paramDemande: ParamDemandeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'pnApplicationApp.paramDemande.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
