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
  '@angular/forms',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  /** @angular-barrel */

  // Thirdparty barrels.
  'rxjs',
  /** @thirdparty-barrel */

  // App specific barrels.
  './',
  'app',
  'app/shared',

  // Modules
  'app/login',
  /** @module-barrel */

  // Routes
  'app/login',
  /** @route-barrel */

  // Components
  'app/auth/auth.component',
  'app/auth/login.component',
  'app/home/home.component',
  'app/home/header.component',
  /** @component-barrel */

  // Directives
  /** @directive-barrel */

  // Services
  'app/auth/auth.service',
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
    'rxjs': 'vendor/rxjs'
  },
  packages: cliPackages
});
System.config({ map, packages });
