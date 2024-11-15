import { Component, OnInit } from '@angular/core';
import { Observable, pluck } from 'rxjs';
import { AuthRootService } from 'src/app/services/auth-root.service';
import { ShelterService } from '../../services/shelter.service';
import { navList } from './menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public readonly menuItems = navList;
  public readonly shelterName$?: Observable<string | undefined>;

  constructor(
    private readonly shelter: ShelterService,
    private readonly auth: AuthRootService
  ) {
    this.shelterName$ = this.shelter.getSelectedShelter$.pipe(
      pluck('name')
    ) as Observable<string | undefined>;
  }

  ngOnInit(): void {}

  public openDialog(): void {
    this.shelter.openDialog();
  }

  public logout(): void {
    this.auth.logout();
  }
}
