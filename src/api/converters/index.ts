import * as changeCase from 'change-case';

import docxPdf from './docxPdf';
import htmlPdf from './htmlPdf';

interface IConverters {
  [key: string]: (data: Buffer) => Promise<Buffer>;
}

export class RootConverter {
  private name: string;
  private functions: IConverters;

  constructor(from: string, to: string) {
    this.name = changeCase.camelCase(from.concat(to));
    this.functions = { htmlPdf, docxPdf };
  }

  get function() {
    return this.functions[this.name];
  }
}