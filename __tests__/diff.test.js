import genDiff from '../src/index.js';
import { expect, test } from '@jest/globals';
import * as fs from 'fs';

const JSONpath1 = '__fixtures__/file1.json';
const JSONpath2 = '__fixtures__/file2.json';

const JSONExpectedResult = fs.readFileSync('__fixtures__/ExpectedResult', 'utf-8');

test.each([
    {
        a: JSONpath1, b: JSONpath2, result: JSONExpectedResult,
    },
])('gendiff $a $b', ({
    a, b, result,
}) => {
    expect(genDiff(a, b)).toBe(result);
});