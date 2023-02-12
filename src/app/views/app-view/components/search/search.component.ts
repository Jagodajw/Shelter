import { Component, Input, OnInit, Self } from '@angular/core';
import { FormBuilder, NgControl } from '@angular/forms';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  @Input() placeholder = '';
  constructor(@Self() ngControl: NgControl, private formBuilder: FormBuilder) {
    super(ngControl);
  }

  ngOnInit(): void {}

  public clearForm(): void {
    this.value = '';
  }

  public onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
  }

}
