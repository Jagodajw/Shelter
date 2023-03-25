import { PipeTransform, Pipe } from '@angular/core';
import {
    DomSanitizer,
    SafeHtml,
    SafeResourceUrl,
    SafeScript,
    SafeStyle,
    SafeUrl,
} from '@angular/platform-browser';

type SanitizerType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl';
type SafeValue = SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl;

@Pipe({
    name: 'safe',
    pure: true,
})
export class SanitizerPipe implements PipeTransform {
    constructor(protected readonly _sanitier: DomSanitizer) {}

    transform(value: string, type: SanitizerType): SafeValue {
        switch (type) {
            case 'html':
                return this._sanitier.bypassSecurityTrustHtml(value);
            case 'style':
                return this._sanitier.bypassSecurityTrustStyle(value);
            case 'script':
                return this._sanitier.bypassSecurityTrustScript(value);
            case 'url':
                return this._sanitier.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this._sanitier.bypassSecurityTrustResourceUrl(value);
            default:
                return this._sanitier.bypassSecurityTrustHtml(value);
        }
    }
}
