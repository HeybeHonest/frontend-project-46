import _ from 'lodash';

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

export default calculateDiff;
