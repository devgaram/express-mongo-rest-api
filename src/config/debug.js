import debug from 'debug';

const customDebug = {
  errorDebug: debug('app:error'),
  infoDebug: debug('app:info'),
};

export default customDebug;
