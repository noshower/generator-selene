const incstr = require('incstr');

const createUniqueIdGenerator = () => {
  const index = {};

  const generateNextId = incstr.idGenerator({
    // Removed "d" letter to avoid accidental "ad" construct.
    // @see https://medium.com/@mbrevda/just-make-sure-ad-isnt-being-used-as-a-class-name-prefix-or-you-might-suffer-the-wrath-of-the-558d65502793
    alphabet: 'abcefghijklmnopqrstuvwxyz0123456789',
  });

  return name => {
    if (index[name]) {
      return index[name];
    }

    let nextId;

    do {
      // Class name cannot start with a number.
      nextId = generateNextId();
    } while (/^[0-9]/.test(nextId));

    index[name] = nextId;

    return index[name];
  };
};

const uniqueFileNameGenerator = createUniqueIdGenerator();

const uniqueClassNameGenerator = createUniqueIdGenerator();

module.exports = (localName, resourcePath) => {
  const componentName = resourcePath.split('/h5/src')[1];
  return `${uniqueFileNameGenerator(componentName)}_${uniqueClassNameGenerator(localName)}`;
};
