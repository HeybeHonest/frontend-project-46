const getIndent = (depth) => ' '.repeat(depth * 4);

const formatValue = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const indent = getIndent(depth + 1);
  const lines = Object.entries(value || {}).map(([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

const formatDiff = (diff, depth = 0) => {
  const indent = getIndent(depth);
  const formatNode = (node, depth = 0) => {
    const indent = getIndent(depth);
    const { type, key, value, oldValue, newValue, children } = node;

    switch (type) {
      case 'added':
        return `${indent}  + ${key}: ${formatValue(value, depth + 1)}`;
      case 'deleted':
        return `${indent}  - ${key}: ${formatValue(value, depth + 1)}`;
      case 'unchanged':
        return `${indent}    ${key}: ${formatValue(value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}  - ${key}: ${formatValue(oldValue, depth + 1)}`,
          `${indent}  + ${key}: ${formatValue(newValue, depth + 1)}`,
        ].join('\n');
      case 'nested':
        return `${indent}    ${key}: ${formatDiff(children, depth + 1)}`;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  };

  const lines = diff.map((node) => formatNode(node, depth));
  return `{\n${lines.join('\n')}\n${indent}}`;
};

export default formatDiff;
