import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: '<%= moduleName %>'
})
export class <%= moduleName %> implements PipeTransform {
  transform(value: any, args?: any): any {
    return null;
  }
}
