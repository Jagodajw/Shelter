import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';

@NgModule({
  declarations: [PeopleComponent],
  imports: [CommonModule, PeopleRoutingModule],
})
export class PeopleModule {}
