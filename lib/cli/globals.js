module.exports = {
  sourceDir     : 'src',
  buildDir      : 'dist',
  tempDir       : 'tmp',
  assetsDir     : 'assets',
  thirdpartyDir : 'thirdparty',
  vendorDir     : 'vendor',

  libraries : {
    angular : [
      'angular2/platform/browser.js',
      'angular2/bundles/angular2.dev.js',
      'angular2/bundles/http.dev.js',
      'angular2/bundles/router.dev.js',
      'angular2/bundles/angular2-polyfills.js',
      'angular2/es6/dev/src/testing/shims_for_IE.js',
      'rxjs/bundles/Rx.js',
      'es6-shim/es6-shim.min.js',
      'systemjs/dist/system.src.js',
      'systemjs/dist/system-polyfills.js',
    ],
  },
};
