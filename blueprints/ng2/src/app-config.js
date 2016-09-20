module.exports = {
  project: {
    version   : '0.0.0',
    name      : '',
  },
  app: {
    appDir    : 'app',
    outDir    : 'dist',
    assets    : 'assets',
    index     : 'index.html',
    main      : 'main.ts',
    vendor    : 'vendor.ts',
    tsconfig  : 'tsconfig.json',
    environments: {
      source  : 'environment.ts',
      dev     : 'environment.dev.ts',
      prod    : 'environment.prod.ts',
    },
  },
  code: {
    // work in progress
    // all components, directives will be prefixed with this
    prefix    : '', // ex: prefix: 'my'  --> my-home-component
  }
};
