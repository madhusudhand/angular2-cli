/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
};

/** User packages configuration. */
const packages: any = {
};


/****************************************************************
 * Do not modify anything. It is completely managed by the CLI. *
 ****************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  /** @angular-barrel */

  // Thirdparty barrels.
  'rxjs',
  /** @thirdparty-barrel */

  // App specific barrels.
  'public',
  'protected',
  'shared',

  // Routes
  /** @route-barrel */

  // Components
  /** @component-barrel */

  // Directives
  /** @directive-barrel */

  // Services
  /** @service-barrel */

  // Pipes
  /** @pipe-barrel */

  // Other
  /** @other-barrel */
];

const cliPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliPackages[barrelName] = { main: 'index' };
});


declare var System: any;

System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
  },
  packages: cliPackages
});
System.config({ map, packages });
