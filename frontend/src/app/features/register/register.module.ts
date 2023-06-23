import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,

    CoreModule,
    SharedModule,
    
    RegisterRoutingModule,
  ],
})
export class RegisterModule {}
