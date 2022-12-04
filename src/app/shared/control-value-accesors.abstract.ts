import { Directive } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export abstract class ControlValueAccessorsAbstract<T = unknown>
  implements ControlValueAccessor
{
  protected onChange!: (value: T) => void;
  protected onTouch!: (value: T) => void;
  constructor() {}

  public abstract writeValue(value: T): void;

  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
