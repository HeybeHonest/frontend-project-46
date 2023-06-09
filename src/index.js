import { getAbsolutePath, getParsedData, calculateDiff } from './utils.js';
import formatDiff from './formatters/index.js';

const generateDiff = (fileName1, fileName2, format = 'stylish') => {
  const filePath1 = getAbsolutePath(fileName1);
  const filePath2 = getAbsolutePath(fileName2);
  const data1 = getParsedData(filePath1);
  const data2 = getParsedData(filePath2);
  const diff = calculateDiff(data1, data2);
  return formatDiff(diff, format);
};

export default generateDiff;
