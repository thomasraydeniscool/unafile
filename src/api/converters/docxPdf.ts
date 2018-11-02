import * as fs from 'fs';
import * as path from 'path';
import * as nanoid from 'nanoid';
import { exec } from 'child_process';

export default async (data: Buffer): Promise<Buffer> => {
  const temp = path.resolve(__dirname, `${nanoid()}.docx`);
  let result;

  await writeTempFile(temp, data);

  try {
    result = await convertDocx(temp);
    await removeTempFile(temp);
  } catch (err) {
    await removeTempFile(temp);
    throw new Error(err);
  }

  return result;
};

const writeTempFile = (file: string, data: Buffer): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const removeTempFile = (file: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(file, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

const convertDocx = (file: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    exec(
      `unoconv -f pdf --stdout ${file}`,
      { cwd: path.resolve(__dirname) },
      (err, stdout: any, stderr) => {
        if (err) {
          reject(err);
        }
        if (stderr) {
          reject(new Error(stderr));
        }
        resolve(Buffer.concat(stdout));
      }
    );
  });
};
