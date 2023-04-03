import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SanitizerPipe } from 'src/app/pipes/sanitizer/sanitizer.pipe';
import { ShelterApiService } from 'src/app/services/shelter-api.service';

@Pipe({
  name: 'getImgFile',
  pure: true,
})
export class ImgFileGetterPipe extends SanitizerPipe implements PipeTransform {
  constructor(
    _sanitier: DomSanitizer,
    private readonly api: ShelterApiService
  ) {
    super(_sanitier);
  }
  override transform(name: string): string {
    const tychShelterImage: string = 'assets/img/shelters/tychy-shelters.png';
    const otozShelterImage: string = 'assets/img/shelters/otoz-shelters.png';

    if (name === 'OTOZ') return otozShelterImage;
    else return tychShelterImage;
    // return this.api
    //   .getShelterImage(shelterId)
    //   .pipe(map((img) => super.transform(img as unknown as string, 'url')));
    // return new Observable((sub) => {
    //   // const b64 = Buffer.from(rawFile.buffer).toString('base64');
    //   // sub.next(`data:image/png;base64,${b64}`);
    //   const reader: FileReader = new FileReader();

    //   reader.onload = () => {
    //     console.log('data', reader.result);
    //     sub.next(reader.result as string);
    //   };
    //   reader.onerror = (err) => {
    //     console.log('error', err);
    //     sub.error(err);
    //   };
    //   reader.onloadend = () => sub.complete();

    //   reader.readAsBinaryString(new Blob([rawFile]));
    // });
  }
}
