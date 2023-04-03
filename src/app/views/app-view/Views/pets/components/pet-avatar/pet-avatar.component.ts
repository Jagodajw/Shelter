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
  public img: string = 'assets/img/photo.png';
  public isAddImg: boolean = false;

  constructor(@Self() ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {}

  onFileChange(event: Event) {
    const file: File[] = (event.target as any).files;
    if (file.length > 1) {
      this.img = 'assets/img/photo.png';
      this.isAddImg = false;
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.createFormData(reader.result);
      this.img = reader.result as string;
      this.isAddImg = true;
    };
    reader.readAsDataURL(file[0]);
  }

  private createFormData(value: ArrayBuffer | null | string): void {
    if (value === null) {
      this.img = 'assets/img/photo.png';
      this.isAddImg = false;
      return;
    }

    const form = new FormData();
    form.append('avatar', new Blob([value]));

    this.value = form;
  }

  override handleValueChangeFromOutside(): void {
    if (!this.value || this.isEmptyBlob(this.value)) {
      this.img = 'assets/img/photo.png';
      this.isAddImg = false;
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.img = reader.result as string;
      this.isAddImg = true;
    };
    reader.readAsBinaryString(new Blob([this.value as string]));
  }

  private isEmptyBlob(value: string | FormData | null): boolean {
    return value instanceof Blob && value.size === 0;
  }

  deleteImg(): void {
    this.value = null;
    this.img = 'assets/img/photo.png';
    this.isAddImg = false;
  }
}
