import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentationComponent implements OnInit {
  documentList: Document[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  panelOpenState = false;
  constructor() {}

  ngOnInit(): void {}

  public addDocument(): void {}
}
