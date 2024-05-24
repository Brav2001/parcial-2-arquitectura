import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'getterProperty'
})
export class GetterPropertyPipe implements PipeTransform {

  transform(object: any, keyName: string, ...args: unknown[]): unknown {
    return object[keyName];
  }

}
