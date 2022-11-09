import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BrowserStorageService } from 'src/app/storage.service';
import { Shelter } from '../choose-shelter-popup/choose-shelter-popup';
import { ChooseShelterPopupService } from '../../services/choose-shelter-popup.service';
import { navList } from './menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public menuItems = navList;

  public typeShelter: Observable<Shelter> =
    this.chooseShelterPopupService.typeSchelterInfo.asObservable();

  constructor(
    private chooseShelterPopupService: ChooseShelterPopupService,
    public storage: BrowserStorageService
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.chooseShelterPopupService.openDialog();
  }
  resetStorage(): void {
    this.storage.clear();
  }
}
