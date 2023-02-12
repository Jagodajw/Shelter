import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyDataComponent {
  @Input() label: string = 'pets.EmptyData';
  @Input() imageWidth?: string;
  @Input() isLoading: boolean | null = false;
  constructor() {}
}
