import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { DocumentResponse } from 'backend/src/views/DocumentView';
import FileSaver from 'file-saver';
import { BehaviorSubject, Observable, mergeMap } from 'rxjs';
import { SnackbarMessageService } from 'src/app/services/snackbar-message.service';
import { FileReaderDialogComponent } from '../../components/file-reader-dialog/component/file-reader-dialog.component';
import { DocumentService } from '../../services/api/document.service';

@UntilDestroy()
@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentationComponent implements OnInit {
  documentList: Document[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  panelOpenState = false;

  readonly attachments: FormControl = new FormControl();
  documents$: Observable<DocumentResponse[]>;

  constructor(
    private readonly documentApi: DocumentService,
    private readonly snackBarMessage: SnackbarMessageService,
    private readonly dialog: MatDialog
  ) {
    this.documents$ = this.getDocuments$;
  }

  private get getDocuments$(): Observable<DocumentResponse[]> {
    return this.documentApi.getDocuments();
  }

  ngOnInit(): void {
    this.documentAddingDetector();
  }

  public documentAddingDetector(): void {
    this.attachments.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((files: FormData[]) => {
        files.forEach((file: FormData) => {
          this.documentApi.addDocument(file).subscribe({
            next: () => {
              this.snackBarMessage.showMessageSnackBar(
                'pets.documentHasBeenAdd'
              );

              this.documents$ = this.getDocuments$;
            },
          });
        });
      });
  }

  downloadAttachment({ ID, name }: { ID: string; name: string }): void {
    this.documentApi.getFile(ID).subscribe({
      next: (file: Blob) => {
        FileSaver.saveAs(file, name);
        this.snackBarMessage.showMessageSnackBar('pets.downloadDocumet');
      },
    });
  }

  deleteAttachment({ ID }: { ID: string; name: string }): void {
    this.documentApi.deleteDocument(ID).subscribe({
      next: () => {
        this.snackBarMessage.showMessageSnackBar('pets.deletedDocument');
        this.documents$ = this.getDocuments$;
      },
    });
  }

  showAttachment({ ID, name }: { ID: string; name: string }): void {
    this.documentApi
      .getFile(ID)
      .pipe(
        mergeMap((file: Blob) =>
          this.dialog
            .open(FileReaderDialogComponent, {
              panelClass: ['modal-without-padding', 'input-70'],
              data: { file, fileName: name },
            })
            .afterClosed()
        )
      )
      .subscribe();
  }
}
