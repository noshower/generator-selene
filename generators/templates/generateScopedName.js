const incstr = require('incstr');

const createUniqueIdGenerator = () => {
  const index = {};

  const generateNextId = incstr.idGenerator({
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789',
  });

  return name => {
    if (index[name]) {
      return index[name];
    }

    let nextId;

    do {
      nextId = generateNextId();
    } while (/^[0-9]/.test(nextId));

    index[name] = nextId;

    return index[name];
  };
};

const uniqueFileNameGenerator = createUniqueIdGenerator();

const uniqueClassNameGenerator = createUniqueIdGenerator();

module.exports = (localName, resourcePath) => {
  return `${uniqueFileNameGenerator(resourcePath)}_${uniqueClassNameGenerator(localName)}`;
};
