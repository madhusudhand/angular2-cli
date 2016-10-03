[![Build Status](https://travis-ci.org/madhusudhand/angular2-cli.svg?branch=master)](https://travis-ci.org/madhusudhand/angular2-cli)

* [Angular 2][angular] with [Typescript][ts]
* [Pug] (was Jade)
* [SASS]/[LESS]

**Note**

This is very much a work in progress.

Currently it is supported for Mac and Linux.


## Setup

> Install [Node.js].
(Requires **Node 4 or greater** and **NPM 3**)

```sh
$ npm install -g angular2-cli
```

#### Creating your angular2 app

```sh
$ ng2 create <app-name> [options]
```

#### Running your app

```sh
$ cd <app-folder>
$ ng2 init
$ ng2 serve
```

#### Running tests

```sh
$ ng2 test
```

#### Lint

```sh
$ npm run lint
```

#### Dev and Production builds

```sh
$ ng2 build --dev
$ ng2 build --prod

$ ng2 serve --dev
$ ng2 serve --prod
```

## Help

```sh
$ ng2 --help
$ ng2 <command> --help
```

#### placeholder for API references

Add environment specific **api** service urls `src/app/environments/environment.[dev/prod].ts`

import `src/app/environments/environment.ts` to your component and use the service variables for your HTTP requests.

#### Copy files/folders to build folder

If you need any files/folders (such as `CNAME`) needs to be copied to build folder

add those entries to `build-config.js` which is located in the project folder.

## License
----

[MIT]


   [angular]: <angular.io>
   [ut]: <https://docs.angularjs.org/guide/unit-testing>
   [ts]: <http://www.typescriptlang.org>
   [pug]: <http://jade-lang.com>
   [SASS]: <http://sass-lang.com>
   [LESS]: <http://lesscss.org>
   [node.js]: <http://nodejs.org>
   [MIT]: <https://github.com/madhusudhand/angular2-cli/blob/master/LICENSE>
