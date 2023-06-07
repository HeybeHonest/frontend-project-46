import { getAbsolutePath, getParsedData, calculateDiff } from './src/utils.js';
import formatStylish from './src/formatters/stylish.js';
import formatPlain from './src/formatters/plain.js';
import formatJSON from './src/formatters/json.js';

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

const generateDiff = (fileName1, fileName2, format = 'stylish') => {
  const filePath1 = getAbsolutePath(fileName1);
  const filePath2 = getAbsolutePath(fileName2);
  const data1 = getParsedData(filePath1);
  const data2 = getParsedData(filePath2);
  const diff = calculateDiff(data1, data2);
  return formatDiff(diff, format);
};

export default generateDiff;
