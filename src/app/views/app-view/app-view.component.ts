import { Component, OnInit } from '@angular/core';
import { ChooseShelterPopupService } from './components/choose-shelter-popup/choose-shelter-popup.service';
@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss'],
  providers: [ChooseShelterPopupService],
})
export class AppViewComponent implements OnInit {
  constructor(
    private readonly chooseShelterService: ChooseShelterPopupService
  ) {}

  ngOnInit(): void {
    this.chooseShelterService.openDialog();
  }
}
