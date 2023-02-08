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
    @Output() remove: EventEmitter<RemovedAttachment> =
        new EventEmitter<RemovedAttachment>();
    @Output() download: EventEmitter<string> = new EventEmitter<string>();
    @Output() showAttachment: EventEmitter<RemovedAttachment> =
        new EventEmitter<RemovedAttachment>();

    constructor() {}
}
