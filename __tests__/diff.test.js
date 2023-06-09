import { expect, test } from '@jest/globals';
import * as path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __dirname = path.resolve();

const getPath = (filename) => path.join(__dirname, '__fixtures__', filename);

const resultPathStylish = getPath('resultStylish.txt');
const stylish = readFileSync(resultPathStylish, 'utf-8');

const resultPathPlain = getPath('resultPlain.txt');
const plain = readFileSync(resultPathPlain, 'utf-8');

const resultPathJSON = getPath('resultJSON.txt');
const json = readFileSync(resultPathJSON, 'utf-8');

test('generate difference between JSON files', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'))).toEqual(stylish);
});

test('generate difference between JSON files with "plain" format', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'), 'plain')).toEqual(plain);
});

test('generate difference between JSON files with "json" format', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'), 'json')).toEqual(json);
});

test('generate difference between YAML files', () => {
  expect(genDiff(getPath('file1.yml'), getPath('file2.yml'))).toEqual(stylish);
});

test('generate difference between YAML and JSON files', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.yml'))).toEqual(stylish);
});

test('generate difference between JSON files with "stylish" format', () => {
  expect(genDiff(getPath('file1.json'), getPath('file2.json'), 'stylish')).toEqual(stylish);
});
