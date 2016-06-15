module.exports = {
  vendorNpmFiles: [
    // these will be copied to dist/vendor
    '@angular',
    'rxjs',
    'systemjs',
    'zone.js',
    'reflect-metadata'
  ],
  otherFiles: [
    // add any files that needs to be copied to dist or any given path
    // valid values
    //   'src/CNAME'                        -> this copies file to dist folder
    //   { src: 'src/CNAME', dest: 'dist'}  -> this copies file to the given location
    'src/CNAME'
  ]
};
