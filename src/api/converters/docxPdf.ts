import * as fs from 'fs';
import * as nanoid from 'nanoid';
import * as unoconv from 'unoconv';

// var unoconv = require('unoconv');

// unoconv.convert('document.docx', 'pdf', function(err, result) {
//   // result is returned as a Buffer
//   fs.writeFile('converted.pdf', result);
// });

export default async (data: Buffer): Promise<Buffer> => {
  const temp = `./temp/${nanoid()}.docx`;

  await writeTempFile(temp, data);

  const result = await convertDocx(temp);

  await removeTempFile(temp);

  return result;
};

export const writeTempFile = (path: string, data: Buffer): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

export const removeTempFile = (path: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const convertDocx = (path: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    unoconv.convert(path, 'pdf', (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};
