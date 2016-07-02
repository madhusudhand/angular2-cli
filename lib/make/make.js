'use strict';

const path   = require('path');
const fs     = require('fs-extra');
const _      = require('lodash');
const EOL    = require('os').EOL;
const fsUtil = require('../util/fs-util');
const logger = require('../ui/logger');

class Make {
  constructor(args) {
    Object.assign(this, {
      options : {
        path : 'src/app',
      },
      fileName : '__name__',
      styleExt : '__style__',
    }, args);
  }

  init() {
    this.fileName = this.options.name;
    this.styleExt = 'scss';
  }

  make(options) {
    const _this = this;
    Object.assign(this.options, options);

    const pathAndName = this.getPathAndName(this.options.pathAndName);
    this.options.name = pathAndName.name;
    this.options.path = pathAndName.path || this.options.path;

    if (this.validate() && this.create()) {
      this.init();
      this.copy().
        then(() => {
          const files = this._getFiles();
          _this._processTemplates(files);
          _this.postInstall();
        });
    }
  }

  validate() {
    throw new Error('Make needs to have validate() defined.');
  }

  create() {
    throw new Error('Make needs to have create() defined.');
  }

  copy() {
    throw new Error('Make needs to have copy() defined.');
  }

  postInstall() {
    // override if required
  }

  placeholders() {
    return {};
  }

  _getFiles() {
    return fs.readdirSync(this.dir);
  }

  _processTemplates(files) {
    for (const f of files) {
      const name = f.replace(/__name__/, this.dashedString(this.options.name))
                    .replace(/__style__/, this.styleExt);
      const fullPath = `${this.dir}/${name}`;
      fs.renameSync(`${this.dir}/${f}`, fullPath);

      fs.readFile(fullPath, (err, data) => {
        const tpl = _.template(data);
        fs.writeFile(fullPath, tpl(this.placeholders()));
      });
      logger.logCreate(fsUtil.dir.relativePath(fullPath));
    }
  }

  camelCaseString(str) {
    return str.replace(/-(.)/g, (s) => s[1].toUpperCase());
  }

  titleCaseString(str) {
    const camelStr = this.camelCaseString(str);
    return camelStr[0].toUpperCase() + camelStr.slice(1);
  }

  getPathAndName(name) {
    let dirname = path.dirname(name)
                      .replace(/^\.\//, '')
                      .replace(/^\./, '')
                      .replace(/^app/, '')
                      .replace(/^src\/app/, '')
                      .replace(/^\//, '');
    dirname = dirname ? `src/app/${dirname}` : 'src/app';

    return {
      name : path.basename(name),
      path : dirname,
    };
  }

  dashedString(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  addBarrel(barrelPath, barrelKind) {
    const barrel = fsUtil.dir.relativePath(barrelPath);
    const file = 'src/system-config.ts';
    const kind = barrelKind || 'other';

    fs.readFile(file, (err, data) => {
      const tpl = _.replace(data,
                            `/** @${kind}-barrel */`,
                            `'${barrel}',${EOL}  /** @${kind}-barrel */`
                    );
      fs.writeFile(file, tpl);
    });
  }
}

module.exports = Make;
