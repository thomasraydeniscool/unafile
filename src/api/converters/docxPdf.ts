import * as fs from 'fs';
import * as path from 'path';
import * as nanoid from 'nanoid';
import * as child_process from 'child_process';

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
    let args;
    let child;
    const bin = 'unoconv';
    const stdout = [];
    const stderr = [];

    args = ['-f' + 'pdf', '--stdout'];

    args.push(file);

    child = child_process.spawn(bin, args, { cwd: path.resolve(__dirname) });

    child.stdout.on('data', data => {
      stdout.push(data);
    });

    child.stderr.on('data', data => {
      stderr.push(data);
    });

    child.on('exit', () => {
      if (stderr.length) {
        return reject(new Error(Buffer.concat(stderr).toString()));
      }

      resolve(Buffer.concat(stdout));
    });
  });
};
