import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-file-reader-dialog',
  templateUrl: './file-reader-dialog.component.html',
  styleUrls: ['./file-reader-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileReaderDialogComponent implements OnInit {
  file!: string;
  pageNumber: number = 1;
  numberOfPages: number = 1;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly data: { file: Blob | undefined; fileName: string }
  ) {}

  ngOnInit(): void {
    if (!this.data.file) return;
    console.log(this.data.file);

    this.file = URL.createObjectURL(this.data.file);
  }

  callBackPdfFn(event: PDFDocumentProxy): void {
    this.numberOfPages = event.numPages;
  }

  prevPage(): void {
    this.pageNumber--;
  }

  nextPage(): void {
    this.pageNumber++;
  }
}
