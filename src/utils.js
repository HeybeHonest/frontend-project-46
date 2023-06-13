import path from 'path';
import process from 'process';
import fs from 'fs';
import parse from './parsers.js';
import genDiff from './genDiff.js';

const fixturesDirPath = path.resolve(process.cwd(), '__fixtures__');

const getAbsolutePath = (filePath) => path.resolve(fixturesDirPath, filePath);

const readFile = (filePath) => fs.readFileSync(getAbsolutePath(filePath), 'utf-8');

const getParsedData = (filePath) => {
  const data = readFile(filePath);
  const format = path.extname(filePath).substring(1);
  return parse(data, format);
};

export {
  getAbsolutePath,
  getParsedData,
  genDiff,
};
