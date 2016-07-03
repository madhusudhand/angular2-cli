## angular2-cli

[![Build Status](https://travis-ci.org/madhusudhand/angular2-cli.svg?branch=master)](https://travis-ci.org/madhusudhand/angular2-cli)

## About

* [Angular 2][angular] with [Typescript][ts]
* [Pug] (was Jade) - Templating
* [SASS]/[LESS] - Pre-processors
* Scaffolding - Generate
  * component
  * directive
  * service
  * pipe

## Setup

> Install [Node.js].

```sh
$ npm install -g angular2-cli
```

## Basic Usage

```sh
$ ng2 --help
$ ng2 <command> --help
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

#### Generate scaffolds

```sh
$ ng2 make <scaffold-type> <scaffold-name>
or
$ ng2 make <scaffold-type> <path/to/scaffold/scaffold-name>
```

#### Running tests

```sh
$ ng2 test
```

#### Build Environments

```sh
$ ng2 build --dev
$ ng2 build --prod

$ ng2 serve --dev
$ ng2 serve --prod
```

#### Service references

Add environment specific **api** service urls in the following location
> config/environment.[dev/prod].ts

import `src/app/environment.ts` to your component and use the service variables.

#### Copy

If you need any files/folders thats needs to be copied such as `CNAME`
add the entries in `angular-build.js` which is located in the project folder.

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
