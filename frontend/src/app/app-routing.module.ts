import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loggedInAuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'register',
    canActivate: [loggedInAuthGuard],
    loadChildren: () =>
      import('./features/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'login',
    canActivate: [loggedInAuthGuard],
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'store',
    loadChildren: () =>
      import('./features/store/store.module').then((m) => m.StoreModule),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./features/games/games.module').then((m) => m.GamesModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
