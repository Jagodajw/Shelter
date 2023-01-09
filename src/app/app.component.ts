import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppInitService } from './services/app-init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly translate: TranslateService,
    private readonly appInit: AppInitService
  ) {
    translate.use('pl');
  }

  ngOnInit(): void {
    this.appInit.init();
  }
}
