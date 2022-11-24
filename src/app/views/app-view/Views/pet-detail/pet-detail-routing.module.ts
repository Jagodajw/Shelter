import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetDetailComponent } from './pet-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PetDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetDetailRoutingModule {
  static component = [PetDetailComponent];
}
