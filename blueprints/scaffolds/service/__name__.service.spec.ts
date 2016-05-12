import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { <%= moduleName %>Service } from './<%= dashedModuleName %>.service';

describe('<%= moduleName %> Service', () => {
  beforeEachProviders(() => [<%= moduleName %>Service]);

  it('should ...',
      inject([<%= moduleName %>Service], (service: <%= moduleName %>Service) => {
    expect(service).toBeTruthy();
  }));
});
