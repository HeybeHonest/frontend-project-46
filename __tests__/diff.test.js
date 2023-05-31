import genDiff from '../src/index.js';
import { expect, test } from '@jest/globals';
import * as fs from 'fs';

const JSONpath1 = '__fixtures__/file1.json';
const JSONpath2 = '__fixtures__/file2.json';
const YMLpath1 = '__fixtures__/file1.yml';
const YMLpath2 = '__fixtures__/file2.yml';

const JSONExpectedResult = fs.readFileSync('__fixtures__/JSONExpectedResult', 'utf-8');
const YMLExpectedResult = fs.readFileSync('__fixtures__/YMLExpectedResult', 'utf-8');

test.each([
    {
        a: JSONpath1, b: JSONpath2, result: JSONExpectedResult,
    },

    {
        a: YMLpath1, b:YMLpath2, result: YMLExpectedResult,
    },

])('gendiff $a $b', ({
    a, b, result,
}) => {
    expect(genDiff(a, b)).toBe(result);
});