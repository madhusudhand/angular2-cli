module.exports = {
  app: {
    appDir    : 'app',
    buildDir  : 'dist',
    tempDir   : 'temp',
    assetsDir : 'assets',
    index     : 'index.pug',
    main      : 'main.ts',
    vendor    : 'vendor.ts',
    tsconfig  : 'tsconfig.json',
    environments: {
      source  : 'environment.ts',
      dev     : 'environment.dev.ts',
      prod    : 'environment.prod.ts',
    },
  },
  development: {
    host: 'localhost',
    port: 8000,
  },
  generator: {
    // work in progress
    // all components, directives will be prefixed with this
    prefix    : '', // ex: prefix: 'my'  --> my-home-component
  },
};
