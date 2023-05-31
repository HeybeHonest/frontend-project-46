import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import formatStylish from './formatters/stylish.js';
import formatPlain from './formatters/plain.js';
import formatJSON from './formatters/json.js';

const currentModuleDir = path.dirname(new URL(import.meta.url).pathname);
const fixturesDirPath = path.resolve(currentModuleDir, '..', '__fixtures__');

const getAbsolutePath = (filePath) => path.resolve(fixturesDirPath, filePath);

const readFile = (filePath) => fs.readFileSync(getAbsolutePath(filePath), 'utf-8');

const parseData = (data, format) => {
  switch (format) {
    case 'js':
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

const getParsedData = (filePath) => {
  const data = readFile(filePath);
  const format = path.extname(filePath).substring(1);
  return parseData(data, format);
};

const calculateDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniq = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(uniq);

  const diff = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj2, key)) {
      return {
        type: 'deleted',
        key,
        value: value1,
      };
    }

    if (!_.has(obj1, key)) {
      return {
        type: 'added',
        key,
        value: value2,
      };
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        type: 'nested',
        key,
        children: calculateDiff(value1, value2),
      };
    }

    if (_.isEqual(value1, value2)) {
      return {
        type: 'unchanged',
        key,
        value: value1,
      };
    }

    return {
      type: 'changed',
      key,
      oldValue: value1,
      newValue: value2,
    };
  });

  return diff;
};

const formatDiff = (diff, format) => {
  switch (format) {
    case 'stylish':
      return formatStylish(diff);
    case 'plain':
      return formatPlain(diff);
    case 'json':
      return formatJSON(diff);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

export default (fileName1, fileName2, format = 'stylish') => {
  const filePath1 = getAbsolutePath(fileName1);
  const filePath2 = getAbsolutePath(fileName2);
  const data1 = getParsedData(filePath1);
  const data2 = getParsedData(filePath2);
  const diff = calculateDiff(data1, data2);
  return formatDiff(diff, format);
};
