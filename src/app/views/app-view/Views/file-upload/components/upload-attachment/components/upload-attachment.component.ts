import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export interface RemovedAttachment {
  id: string | undefined;
  name: string;
}

@Component({
  selector: 'app-upload-attachment',
  templateUrl: './upload-attachment.component.html',
  styleUrls: ['./upload-attachment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadAttachmentComponent {
  @Input() file: File | any;
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  @Output() download: EventEmitter<any> = new EventEmitter<any>();
  @Output() showAttachment: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}
