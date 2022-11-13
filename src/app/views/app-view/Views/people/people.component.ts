import { Component, OnInit } from '@angular/core';
import { ButtonFilter } from '../../components/button-filter/button-filter';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  public filtersPeople: ButtonFilter[] = [
    {id: 0, name: 'Przyprowadzające'},
    {id: 1, name: 'Odbierające'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
