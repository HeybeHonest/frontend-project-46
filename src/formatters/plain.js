import _ from 'lodash';

const formatPlain = (diff) => {
  const formatValue = (value) => {
    if (_.isPlainObject(value)) {
      return '[complex value]';
    }
    if (_.isString(value)) {
      return `'${value}'`;
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
        return `Property '${fullPath}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  };

  const lines = diff.flatMap((node) => formatNode(node));
  return lines.join('\n');
};

export default formatPlain;

