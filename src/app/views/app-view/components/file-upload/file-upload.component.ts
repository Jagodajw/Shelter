import { Component, forwardRef, OnInit, Self } from '@angular/core';
import { FormGroup, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => FileUploadComponent),
  //     multi: true,
  //   },
  // ],
})
export class FileUploadComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  public documentList!: File[];

  documentForm!: FormGroup;

  constructor(@Self() ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {}

  onFileSelected(event: Event) {
    const file: File[] = (event.target as any).files;
    const reader: FileReader = new FileReader();
  }
}
