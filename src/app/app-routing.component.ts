import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {
    path: 'auth-view',
    loadChildren: () =>
      import('./views/auth-view/auth-view.module').then(
        (m) => m.AuthViewModule
      ),
  },
  {
    path: 'app-view',
    loadChildren: () =>
      import('./views/app-view/app-view.module').then((m) => m.AppViewModule),
  },
  {
    path: '**',
    redirectTo: 'auth-view',
    // pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      enableTracing: environment.enableRoutingTracing,
      relativeLinkResolution: 'legacy',
      paramsInheritanceStrategy: 'always',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
