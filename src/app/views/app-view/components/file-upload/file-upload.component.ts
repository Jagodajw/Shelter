import { Component, forwardRef, OnInit } from '@angular/core';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  public documentList!: File[];

  documentForm!: FormGroup;

  constructor() {
    super();
  }
  public writeValue(value: unknown): void {}
  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const file: File[] = (event.target as any).files;
    const reader: FileReader = new FileReader();
    console.log(file[0]);
  }
}
