import * as path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';
import { expect, test } from '@jest/globals';
import process from 'process';

const firstAnswerPath = path.resolve(process.cwd(), '__fixtures__/JSONExpectedResult');
const firstAnswer = readFileSync(firstAnswerPath, 'utf8');


test('genDiff JSON plain', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(firstAnswer);
});

test('genDiff YML plain', () => {
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(firstAnswer);
});


