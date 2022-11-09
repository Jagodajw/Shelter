import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from 'src/app/storage.service';
import { ChooseShelterPopupService } from './services/choose-shelter-popup.service';
@Component({
  selector: 'app-app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.scss'],
  providers: [ChooseShelterPopupService],
})
export class AppViewComponent implements OnInit {
  constructor(
    private readonly chooseShelterService: ChooseShelterPopupService,
    private readonly storage: BrowserStorageService
  ) {}

  ngOnInit(): void {
    if (!this.storage.get('shelter')) {
      this.chooseShelterService.openDialog();
    }
  }
}
