import { Component, OnInit } from '@angular/core';
import { ButtonFilter } from '../../components/button-filter/button-filter';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
  public filtersPets: ButtonFilter[] = [
    {id: 0, name: 'Przebywające'},
    {id: 1, name: 'Wydane'},
  ]
  constructor() { }

  ngOnInit(): void {
  }

  add(event:number){
    console.log(event);
  }
}
