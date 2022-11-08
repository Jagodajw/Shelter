import { Component, OnInit } from '@angular/core';
import menuConfiguration from './menu.json';
import { iMenuInterface } from './menu';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu = menuConfiguration;
  constructor() {}

  ngOnInit(): void {}
}
