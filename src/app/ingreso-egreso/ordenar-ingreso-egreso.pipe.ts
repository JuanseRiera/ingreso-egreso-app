import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../types/types.models';

@Pipe({
  name: 'ordenarIngresoEgreso'
})
export class OrdenarIngresoEgresoPipe implements PipeTransform {

  transform(items: Array<IngresoEgreso>): Array<IngresoEgreso> {
    return items.slice().sort(item=>{
      if(item.tipo=='Ingreso'){
        return -1;
      }else{
        return 1;
      }
    });
  }

}
