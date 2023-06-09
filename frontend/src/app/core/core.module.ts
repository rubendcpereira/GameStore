import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';

@NgModule({
  declarations: [HeaderComponent, NavbarComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [HeaderComponent],
})
export class CoreModule {}
