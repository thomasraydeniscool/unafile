import * as got from 'got';
import * as Raven from 'raven';

import { RootConverter } from './converters';

export const convert = async (req, res) => {
  const { from, to, document } = req.body;
  /**
   * Get document data (as Buffer)
   */
  let doc;
  if (document.url && typeof document.url === 'string') {
    try {
      doc = await got(document.url, { encoding: null }).then(
        response => response.body
      );
    } catch (err) {
      // TODO: 500 ERROR
      Raven.captureException(err);
    }
  } else if (document.data && typeof document.data === 'string') {
    doc = Buffer.from(document.data, 'base64');
  } else {
    // TODO: 400 ERROR
  }
  /**
   * Run conversion
   */
  const converter = new RootConverter(from, to);
  const result = await converter.function(doc);
  /**
   * Send result to client
   */
  res.setHeader('Content-Type', 'application/pdf');
  res.send(result);
};
