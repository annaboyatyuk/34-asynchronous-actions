'use strict';

import coffee from '../src/models/coffee';
import parks from '../src/models/parks';

export default (dir) => {

  const fakeMongo = {
    find: () => Promise.resolve([]),
    findById: () => Promise.resolve({}),
    save: data => Promise.resolve(data),
    findByIdAndUpdate: () => Promise.resolve({}),
    findByIdAndDelete: () => Promise.resolve({}),
  };

  if(typeof dir !== 'string') {
    return {};
  }
  return {
    'foo': {default: fakeMongo},
    'coffee': {default: coffee},
    'parks': {default: parks},
  };
};
