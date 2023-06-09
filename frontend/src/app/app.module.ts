import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from './features/store/store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    CoreModule,
    SharedModule,

    HomeModule,
    StoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
