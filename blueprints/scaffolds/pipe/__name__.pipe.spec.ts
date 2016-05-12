import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders
} from '@angular/core/testing';
import { <%= moduleName %> } from './<%= dashedModuleName %>.pipe';

describe('<%= moduleName %> Pipe', () => {
  beforeEachProviders(() => [<%= moduleName%>]);

  it('should transform the input', inject([<%= moduleName %>], (pipe: <%= moduleName %>) => {
      expect(pipe.transform(true)).toBe(null);
  }));
});
