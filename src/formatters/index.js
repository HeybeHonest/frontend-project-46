import formatStylish from './stylish.js';
import formatJSON from './json.js';
import formatPlain from './plain.js';

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

  export default formatDiff;
  