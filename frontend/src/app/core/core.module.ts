import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './layout/navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NavBarComponent],
  imports: [CommonModule, HttpClientModule, SharedModule],
  exports: [NavBarComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
