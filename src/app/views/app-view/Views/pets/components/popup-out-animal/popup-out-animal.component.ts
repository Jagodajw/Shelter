import { Component, OnInit } from '@angular/core';
import { Select } from 'src/app/views/app-view/components/select/select';

@Component({
  selector: 'app-popup-out-animal',
  templateUrl: './popup-out-animal.component.html',
  styleUrls: ['./popup-out-animal.component.scss'],
})
export class PopupOutAnimalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  public arrayOfSpecies: Select[] = [
    { id: 0, name: 'kot' },
    { id: 1, name: 'pies' },
  ];
  chooseSelect(event: Select) {
    console.log(event);
  }
  chooseAutocomplete(event: Select) {
    console.log(event);
  }
}
