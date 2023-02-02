import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-toolbar-date',
  templateUrl: './toolbar-date.component.html',
  styleUrls: ['./toolbar-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarDateComponent implements OnInit {
  private static readonly MINUTE_IN_SECONDS: number = 60;
  public hour!: Observable<string | null>;
  public dayName!: string | null;
  public date!: string | null;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.observeHourTime();
    this.dayName = this.datePipe.transform(new Date(), 'EEEE');
    this.date = this.datePipe.transform(new Date(), 'dd.MM.yyyy');
  }

  observeHourTime(): void {
    this.hour = timer(0, ToolbarDateComponent.MINUTE_IN_SECONDS * 1000).pipe(
      map(() => new Date()),
      map((time: Date) => this.datePipe.transform(time, 'H:mm'))
    );
  }
}
