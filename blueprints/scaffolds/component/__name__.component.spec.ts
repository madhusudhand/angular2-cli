import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { <%= moduleName %>Component } from './<%= dashedModuleName %>.component';

describe('Component: <%= moduleName %>', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [<%= moduleName %>Component]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([<%= moduleName %>Component],
      (component: <%= moduleName %>Component) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(<%= moduleName %>ComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(<%= moduleName %>Component));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <<%= selector %>></<%= selector %>>
  `,
  directives: [<%= moduleName %>Component]
})
class <%= moduleName %>ComponentTest {
  
}
