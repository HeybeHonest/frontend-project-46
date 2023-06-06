import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const resultPathStylish = getPath('resultStylish.txt');
const stylish = fs.readFileSync(resultPathStylish, 'utf-8');

const resultPathPlain = getPath('resultPlain.txt');
const plain = fs.readFileSync(resultPathPlain, 'utf-8');

const resultPathJSON = getPath('resultJSON.txt');
const JSON = fs.readFileSync(resultPathJSON, 'utf-8');

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














// import * as path from 'path';
// import { readFileSync } from 'fs';
// import genDiff from '../src/index.js';
// import { expect, test } from '@jest/globals';
// import process from 'process';

// const firstAnswerPath = path.resolve(process.cwd(), '__fixtures__/JSONExpectedResult.txt');
// const firstAnswer = readFileSync(firstAnswerPath, 'utf8');


// test('genDiff JSON plain', () => {
//   expect(genDiff('file1.json', 'file2.json')).toEqual(firstAnswer);
// });

// test('genDiff YML plain', () => {
//   expect(genDiff('file1.yml', 'file2.yml')).toEqual(firstAnswer);
// });


