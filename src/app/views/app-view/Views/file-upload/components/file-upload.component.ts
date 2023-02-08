import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { RemovedAttachment } from './upload-attachment/components/upload-attachment.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent
  extends ControlValueAccessorsAbstract<FormData[]>
  implements OnInit
{
  @Input() label: string = 'documents.upload';
  files!: File[];
  @Output() deleteAttachment: EventEmitter<string> = new EventEmitter<string>();
  @Output() downloadAttachment: EventEmitter<string> =
    new EventEmitter<string>();

  constructor(@Self() ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {
    if (this.value && Array.isArray(this.value))
      this.files = [...(this.value as any)];
  }

  onFileSelected(value: Event | any): void {
    this.files = Object.keys(value.target.files).map(
      (file) => value.target.files[file]
    );
    this.createFormData();
  }

  removeAttachment({ id, name }: RemovedAttachment): void {
    this.deleteAttachment.emit(id);
    this.files = this.files.filter((file) => file.name !== name);
    this.createFormData();
  }

  private createFormData(): void {
    const values: FormData[] = [];

    this.files.forEach((file) => {
      const form = new FormData();
      form.append('bill', file);
      values.push(form);
    });

    this.value = values;
  }
}
