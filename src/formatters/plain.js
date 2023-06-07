import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isBoolean(value)) {
    return value ? 'true' : 'false';
  }
  if (_.isNull(value)) {
    return 'null';
  }
  return String(value);
};

const formatNode = (node, path = '') => {
  const fullPath = path ? `${path}.${node.key}` : node.key;
  switch (node.type) {
    case 'nested':
      return node.children.flatMap((child) => formatNode(child, fullPath));
    case 'added':
      return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`;
    case 'deleted':
      return `Property '${fullPath}' was removed`;
    case 'changed':
      return `Property '${fullPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const formatPlain = (diff) => {
  const lines = diff.flatMap((node) => formatNode(node));
  const result = lines.join('\n');
  return result;
};

export default formatPlain;
