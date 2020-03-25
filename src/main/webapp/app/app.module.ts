import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { PnApplicationSharedModule } from 'app/shared/shared.module';
import { PnApplicationCoreModule } from 'app/core/core.module';
import { PnApplicationAppRoutingModule } from './app-routing.module';
import { PnApplicationHomeModule } from './home/home.module';
import { PnApplicationEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    PnApplicationSharedModule,
    PnApplicationCoreModule,
    PnApplicationHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    PnApplicationEntityModule,
    PnApplicationAppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent]
})
export class PnApplicationAppModule {}
