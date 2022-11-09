import { Component, OnInit } from '@angular/core';
import { ChooseShelterPopupService } from '../choose-shelter-popup/choose-shelter-popup.service';
import { navList } from './menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public menuItems = navList;
  constructor(private chooseShelterPopupService: ChooseShelterPopupService) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.chooseShelterPopupService.openDialog();
  }
}
