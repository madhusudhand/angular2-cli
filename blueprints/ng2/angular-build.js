module.exports = {
  vendorNpmFiles: [
    // these will be copied from node_modules to dist/vendor
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
    'src/CNAME',
    { src: 'bower_components/materialize/bin/materialize.js', dest: 'dist/thirdparty/materialize' },
    { src: 'bower_components/materialize/bin/materialize.css', dest: 'dist/thirdparty/materialize' }
  ]
};
