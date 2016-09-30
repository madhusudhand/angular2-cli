'use strict';

const loaderUtils = require('loader-utils');
const path        = require('path');

const templateUrlRegex = /templateUrl *:(.*)$/gm;
const stylesRegex      = /styleUrls *:(\s*\[[^\]]*?\])/g;
const stringRegex      = /(['"])((?:[^\\]\\\1|.)*?)\1/g;

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

  if (this.cacheable) {
    this.cacheable();
  }

  const newContent = content.replace(
                      templateUrlRegex,
                      (match, url) => `template: ${replaceWithRequire(url, relativePath)}`
                    ).replace(
                      stylesRegex,
                      (match, urls) => `styles: ${replaceWithRequire(urls, relativePath)}`
                    );

  return newContent;
}

module.exports = loader;
