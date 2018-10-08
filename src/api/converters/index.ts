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
    this.name = changeCase.camelCase(`${from}-${to}`);
    this.functions = { htmlPdf, docxPdf };
  }

  get function() {
    return this.functions[this.name];
  }

  public setHeaders(res) {
    res.setHeader('Content-Type', 'application/pdf');
  }
}
