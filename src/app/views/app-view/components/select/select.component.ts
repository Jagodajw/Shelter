import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select } from './select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  speciesControl = new FormControl('');
  selecty: Select []= [
    {
    id:0, 
    categorySelect: [{  nameCategory:'gatunek', option:[
      {idOption: 0, name:'kot'},
      {idOption: 1, name:'kot'},
      {idOption: 2, name:'kot'},
      {idOption: 3, name:'kot'},

    ]}  ]},
    {
      id:1, 
      categorySelect: [{  nameCategory:'rasa', option:[
        {idOption: 0, name:'rasa'},
        {idOption: 1, name:'rasa1'},
        {idOption: 2, name:'rasa2'},
        {idOption: 3, name:'rasa3'},
  
      ]}  ]}]
  

    

  constructor() { }

  ngOnInit(): void {
  }
  
}
