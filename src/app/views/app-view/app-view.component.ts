import { Component, OnInit } from '@angular/core';
import { ShelterService } from './services/shelter.service';
@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss'],
})
export class AppViewComponent implements OnInit {
  constructor(private readonly shelter: ShelterService) {}

  ngOnInit(): void {
    this.shelter.init();
  }
}
