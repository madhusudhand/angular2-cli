'use strict';

const util = require('loader-utils');
const pug = require('pug');

function loader(source) {
  if (this.cacheable) {
    this.cacheable();
  }
  const query = util.parseQuery(this.query);
  const options = Object.assign({
    filename     : this.resourcePath,
    doctype      : query.doctype || 'js',
    compileDebug : this.debug || false,
  }, query);
  const content = pug.compile(source, options)(query);
  return `module.exports = ${JSON.stringify(content)};`;
}

module.exports = loader;
