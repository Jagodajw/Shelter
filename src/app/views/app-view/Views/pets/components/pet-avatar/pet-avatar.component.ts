import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pet-avatar',
  templateUrl: './pet-avatar.component.html',
  styleUrls: ['./pet-avatar.component.scss'],
})
export class PetAvatarComponent implements OnInit {
  public img: string =
    'https://otoz.pl/wp-content/themes/otoz/images/otoz-animals.png';

  constructor() {}

  ngOnInit(): void {
  }

  onFileChange(event: Event) {
    const file: File[] = (event.target as any).files;
    if (file.length > 1) return;
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.img = reader.result as string;
    };
    reader.readAsDataURL(file[0]);
  }
}
