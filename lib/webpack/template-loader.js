'use strict';

const loaderUtils = require('loader-utils');
const path = require('path');

const templateUrlRegex = /templateUrl *:(.*)$/gm;
const stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;
const stringRegex = /(['"])((?:[^\\]\\\1|.)*?)\1/g;

function absolutePath(urls, basePath) {
  return urls.replace(stringRegex, (match, quote, url) => `'${path.join(basePath, url)}'`);
}

function replaceWithRequire(urls) {
  return urls.replace(stringRegex, (match, quote, url) => {
    const fullUrl = url.charAt(0) !== '.' ? `./${url}` : url;
    return `require('${fullUrl}')`;
  });
}

function loader(content) {
  const query = loaderUtils.parseQuery(this.query);
  const relativePath = path.relative(query.rootPath, path.dirname(this.resourcePath))
                       .replace(/^src/g, '.');

  // Not cacheable during unit tests;
  if (this.cacheable) {
    this.cacheable();
  }

  const newSource = content.replace(
                      templateUrlRegex,
                      (match, url) => `template: ${replaceWithRequire(url, relativePath)}`
                    ).replace(
                      stylesRegex,
                      (match, urls) => `styles: ${replaceWithRequire(urls, relativePath)}`
                    );

  // Support for tests
  // if (this.callback) {
  //   this.callback(null, newSource, sourcemap);
  // }
  // else {
  return newSource;
  // }
}

module.exports = loader;
