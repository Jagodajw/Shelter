import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { Select } from './select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => SelectComponent),
  //     multi: true,
  //   },
  // ],
})
export class SelectComponent
  extends ControlValueAccessorsAbstract<string | number | null>
  implements OnInit
{
  @Input() values: Select[] = [];
  @Input() placeholder: string = '';
  @Output() change: EventEmitter<string | number | null> = new EventEmitter<
    string | number | null
  >();
  public controlSelect: FormControl<string | number | null> = new FormControl(
    null
  );

  constructor(@Self() ngControl: NgControl) {
    super(ngControl);
  }

  ngOnInit(): void {}

  selection(event: MatSelectChange): void {
    const value: string | number = (event.value as Select).ID;
    this.change.emit(value);
    this.value = value;
  }
  protected override handleSetDisabledStateFromOutside(): void {
    if (this.isDisabled) return this.controlSelect.disable();
    this.controlSelect.enable();
  }

  public compareSelect(select1: Select, selectedId: string): boolean {
    return select1 && select1.ID === selectedId;
  }
  override handleValueChangeFromOutside(): void {
    this.controlSelect.patchValue(this.value);
  }
}
