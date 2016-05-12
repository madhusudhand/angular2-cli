'use strict';

const component   = require('./component');
const directive   = require('./directive');
const pipe        = require('./pipe');
const service     = require('./service');
const route       = require('./route');

module.exports = {
  create : (scaffold) => {
    switch (scaffold) {
      case 'component':
        return component.create();
      case 'directive':
        return directive.create();
      case 'pipe':
        return pipe.create();
      case 'service':
        return service.create();
      case 'route':
        return route.create();
      default:
        return null;
    }
  },
};
