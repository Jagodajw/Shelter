import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonFilterModule } from '../../components/button-filter/button-filter.module';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';

@NgModule({
  declarations: [PeopleComponent],
  imports: [CommonModule, PeopleRoutingModule, ButtonFilterModule],
})
export class PeopleModule {}
