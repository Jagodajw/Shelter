import { Component, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';

@Component({
  selector: 'app-pet-avatar',
  templateUrl: './pet-avatar.component.html',
  styleUrls: ['./pet-avatar.component.scss'],
})
export class PetAvatarComponent
  extends ControlValueAccessorsAbstract<FormData | string>
  implements OnInit
{
  private file!: File;
  public img: string =
    'https://otoz.pl/wp-content/themes/otoz/images/otoz-animals.png';

  constructor(@Self() ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {}

  onFileChange(event: Event) {
    const file: File[] = (event.target as any).files;
    if (file.length > 1) return;

    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.createFormData(reader.result);
      this.img = reader.result as string;
    };
    reader.readAsDataURL(file[0]);
  }

  private createFormData(value: ArrayBuffer | null | string): void {
    if (value === null) return;

    const form = new FormData();
    form.append('avatar', new Blob([value]));

    this.value = form;
  }

  override handleValueChangeFromOutside(): void {
    if (!this.value) return;

    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.img = reader.result as string;
    };
    reader.readAsBinaryString(new Blob([this.value as string]));
  }
}
