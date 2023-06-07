import { expect, test } from '@jest/globals';
import * as path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';


const __dirname = path.resolve();

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);

const resultPathStylish = getPath('resultStylish.txt');
const stylish = readFileSync(resultPathStylish, 'utf-8');

const resultPathPlain = getPath('resultPlain.txt');
const plain = readFileSync(resultPathPlain, 'utf-8');

const resultPathJSON = getPath('resultJSON.txt');
const JSON = readFileSync(resultPathJSON, 'utf-8');

test('generate difference between JSONs files', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'))).toEqual(stylish);
});

test('generate difference between JSONs files with "plain" format', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'), 'plain')).toEqual(plain);
});

test('generate difference between JSON with "JSON" format', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'), 'json')).toEqual(JSON);
});

test('generate difference between YMAL/YML files', () => {
  expect(genDiff(getPath('file1.yml'), getPath('file2.yml'))).toEqual(stylish);
});

test('generate difference between YMAL and JSON files', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.yml'))).toEqual(stylish);
});
