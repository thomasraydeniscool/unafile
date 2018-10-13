import axios from 'axios';
import * as validator from 'validator';

import { ApiError, ApiSuccess } from 'express-mate';

import { RootConverter } from './converters';

/**
 * Request object example
 *
 * {
 *   "from": "html",
 *   "to": "pdf",
 *   "url": "url to data",
 *   "data": "base64"
 * }
 */

export const convert = async (req, res) => {
  const { from, to, data, url } = req.body;

  let doc;

  if (data) {
    try {
      doc = await parseData(data);
    } catch (err) {
      throw new ApiError(res, err);
    }
  } else if (url) {
    try {
      doc = await parseUrl(url);
    } catch (err) {
      throw new ApiError(res, err);
    }
  } else {
    throw new ApiError(res, 'no document data or url provided');
  }

  const converter = new RootConverter(from, to);
  const result = await converter.function(doc);

  return new ApiSuccess(res, result.toString('base64'));
};

const parseData = async data => {
  if (!validator.isBase64(data)) {
    throw new Error('data must be of base64 encoding');
  }

  const result = Buffer.from(data, 'base64');

  return result;
};

const parseUrl = async url => {
  if (!validator.isURL(url)) {
    throw new Error('url is invalid');
  }

  const result = await axios.get(url);

  return result;
};
