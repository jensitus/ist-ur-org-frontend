import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'url2linkPipe'
})
export class Url2linkPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }
  transform(value: string): SafeHtml {
    // console.log(value.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/));
    // const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gm;
    // const expression = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

    const expression = /http[0-9a-zA-Z:\/._-]+/;

    const regex = new RegExp(expression);
      if (value.match(regex)) {
        console.log('yes:', value.match(regex));
        const ma = value.match(regex);
        console.log('ma', ma);
        let url;
        url =  '<a href="' + value + '" target="_blank">' + value + '</a>';
        return value.replace(expression, '<a href="' + value.match(regex) + '" target="_blank">' + value.match(regex) + '</a>');
      } else {
        return value;
      }

  }

}
