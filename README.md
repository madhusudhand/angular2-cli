## angular2-cli [ A L P H A ]

[![Build Status](https://travis-ci.org/madhusudhand/angular2-cli.svg?branch=master)](https://travis-ci.org/madhusudhand/angular2-cli)

Lets you kick start your Angular-2 app **super fast**.

## Setup

> Install [Node.js].

```sh
$ npm install -g angular2-cli
```

## Usage

Creating your angular2 app

```sh
$ ng2 create <app-name>
```

Running your app for the first time

```sh
$ cd <app-folder>
$ ng2 init
$ ng2 serve
```

Anytime later

```sh
$ cd <app-folder>
$ ng2 serve
```

#### What you can code

* [Angular 2][angular] with [Typescript][ts]
* [Jade] - for html templating
* [SASS] - for CSS styling

#### Why these?

 - Angular 2 is popular with **Typescript** for its elegant features. And recomended language from Angular Team.
 - **Jade**: This quickstart repo is build to work with plain html files or Jade or both. I recomend the use of Jade templating in your apps as your code looks lot more cleaner and you never have to worry about improper closing of tags.
 - **SASS**: Again, keep your code clean and less with SASS styling instead of CSS. Do create the files with ```.scss``` extension even if you are writing plain CSS.

#### App Structure
All your code goes inside

```
your-app/src/app
```

 - Always keep single Component in single file and name it accordingly.
 - Do not create folder structure such as one for `components`, one for `templates`, one for `CSS` etc.
 - Keep the component (`.ts`), its template (`.jade` or `.html`), its styling (`.scss`) and the test files (`.spec.ts`) all in a single folder and name all of them same. [folder and files]
 - Keep the app origanized by creating hierarchy of folders. It is always good idea to limit this hierarchy to atmost 5 levels.
 - Please do refere [John Papa's Angular 2 style-guide][a2sg].

## Source control

Consider taking the following steps to add you project to Git.

```sh
$ git init
$ git add .
$ git commit -m "Initial commit"
```

Create a remote repository for this project on the service of your choice and push the local repo to the remote.

```
$ git remote add origin <repo-address>
$ git push -u origin master
```


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
