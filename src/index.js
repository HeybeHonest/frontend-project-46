import { getParsedData, genDiff } from './utils.js';
import formatDiff from './formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const obj1 = getParsedData(filepath1);
  const obj2 = getParsedData(filepath2);
  const diff = genDiff(obj1, obj2);
  return formatDiff(diff, format);
};
