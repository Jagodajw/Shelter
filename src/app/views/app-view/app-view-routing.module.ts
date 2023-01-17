import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppViewComponent } from './app-view.component';

const routes: Routes = [
  {
    path: '',
    component: AppViewComponent,
    children: [
      {
        path: 'documentation',
        loadChildren: () =>
          import('./Views/documentation/documentation.module').then(
            (m) => m.DocumentationModule
          ),
      },
      {
        path: 'people',
        loadChildren: () =>
          import('./Views/people/people.module').then((m) => m.PeopleModule),
      },
      {
        path: 'pets',
        loadChildren: () =>
          import('./Views/pets/pets.module').then((m) => m.PetsModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./Views/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('./Views/stats/stats.module').then((m) => m.StatsModule),
      },
      {
        path: 'pet-detail/:id',
        loadChildren: () =>
          import('./Views/pet-detail/pet-detail.module').then(
            (m) => m.PetDetailModule
          ),
      },
      {
        path: '**',
        redirectTo: 'pets',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppViewRoutingModule {
  static component = [AppViewComponent];
}
