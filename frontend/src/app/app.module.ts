import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { CoreModule } from './core/core.module';
import { StoreModule } from './features/store/store.module';
import { RegisterModule } from './features/register/register.module';
import { GamesModule } from './features/games/games.module';
import { LoginModule } from './features/login/login.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    CoreModule,
    SharedModule,

    HomeModule,
    StoreModule,
    RegisterModule,
    LoginModule,
    GamesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
