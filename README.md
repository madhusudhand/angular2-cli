## angular2-cli [ A L P H A ]

[![Build Status](https://travis-ci.org/madhusudhand/angular2-cli.svg?branch=master)](https://travis-ci.org/madhusudhand/angular2-cli)

Kick start your Angular-2 app **super fast**.

You can setup your **App** with two available task runners; either **Grunt** or **Gulp** and you can configure additional tasks of your own choice.

## Setup

> Install [Node.js].

```sh
$ npm install -g angular2-cli
```

## Usage

> ng2 --help
> ng2 <command> --help

Creating your angular2 app

```sh
$ ng2 create <app-name> [options]
```

Running your app

```sh
$ cd <app-folder>
$ ng2 init
$ ng2 serve
```

Running tests

```sh
$ ng2 test
```

#### What you can code

* [Angular 2][angular] with [Typescript][ts]
* [Jade] - html templating
* [SASS] - styling

 - Angular 2 is popular with **Typescript** for its elegant features.
 - **Jade**: This is build to work with plain html files or Jade. Make use of power of Jade in your apps as your code looks lot more cleaner and you never have to worry about improper closing of tags. However if you would wish to write HTML only, then continue writing HTML itself inside .jade files.
 - **SASS**: Do create the files with ```.scss``` extension even if you are writing plain CSS.

#### App Structure
All your code goes inside

```
your-app/src/app
```

 - Always keep single Component in single file and name it accordingly.
 - Do not create folder structure such as one for `components`, one for `templates`, one for `CSS` etc.
 - Keep the component (`.ts`), its template (`.jade`), its styling (`.scss`) and the test files (`.spec.ts`) all in a single folder and name all of them same. [folder and files]
 - Keep the app organized by creating hierarchy of folders. It is always good idea to limit this hierarchy to at most 5 levels.
 - Please do refer [John Papa's Angular 2 style-guide][a2sg].

#Scaffolding

> Coming soon


## License
----

[MIT]


   [angular]: <angular.io>
   [ut]: <https://docs.angularjs.org/guide/unit-testing>
   [ts]: <http://www.typescriptlang.org>
   [jade]: <http://jade-lang.com>
   [sass]: <http://sass-lang.com>
   [grunt]: <https://gruntjs.com>
   [node.js]: <http://nodejs.org>
   [MIT]: <https://github.com/madhusudhand/angular2-quickstart/blob/master/LICENSE>
   [a2sg]: <https://github.com/johnpapa/angular-styleguide/blob/master/a2/README.md>
