import { Component, OnInit } from '@angular/core';

import { Shelters } from '../choose-shelter-popup/choose-shelter-popup';
import { ChooseShelterPopupService } from '../../services/choose-shelter-popup.service';
import { navList } from './menu';

import { StorageService } from 'src/app/services/storage.service';
import { Observable, pluck } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public menuItems = navList;

  public readonly shelterName$?: Observable<string | undefined>;

  constructor(
    private chooseShelterPopupService: ChooseShelterPopupService,
    public storage: StorageService
  ) {
    this.shelterName$ = this.chooseShelterPopupService.shelter
      .asObservable()
      .pipe(pluck('name')) as Observable<string | undefined>;
  }

  ngOnInit(): void {}

  openDialog(): void {
    this.chooseShelterPopupService.openDialog();
  }
  resetStorage(): void {
    this.storage.clear();
  }
}
