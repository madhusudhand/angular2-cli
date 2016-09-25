const loaderUtils = require('loader-utils');
const path = require('path');

const templateUrlRegex = /templateUrl *:(.*)$/gm;
const stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;
const stringRegex = /(['"])((?:[^\\]\\\1|.)*?)\1/g;

function absolutePath(urls, basePath) {
  // const fullUrl = url.charAt(0) !== '.' ? `${url}` : url;
  // return `require('${fullUrl}')`;
  return urls.replace(stringRegex, (match, quote, url) => `'${path.join(basePath, url)}'`);
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
                      (match, url) => `templateUrl: ${absolutePath(url, relativePath)}`
                    ).replace(
                      stylesRegex,
                      (match, urls) => `styleUrls: ${absolutePath(urls, relativePath)}`
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
