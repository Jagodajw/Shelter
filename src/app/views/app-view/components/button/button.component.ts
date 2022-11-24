import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() public variant: 'stroked' | 'raised' | 'cancelable' | 'icon' =
    'raised';
  @Input() public disabled: boolean = false;
  @Input() public isProcessing: boolean = false;
  @Input() public widthFull: boolean = false;
  @Input() public type: 'button' | 'submit' = 'button';
  @Input() public tooltipMessage: string = '';
  @Output() public clickEvent: EventEmitter<void> = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}
}
