import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IngresoEgreso } from 'src/app/types/types.models';
import { tipoIngresoEgreso } from '../../types/types.models';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  graficaLabels:Array<tipoIngresoEgreso>=['Ingreso','Egreso'];
  graficaData:Array<number>=[];
  graficaColores:Array<any>=[{backgroundColor:['#2ECC71','#EC7063']}];

  ingresos:number=0;
  egresos:number=0;

  totalIngresos:number=0;
  totalEgresos:number=0;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ingresoEgreso').subscribe(resp=>{
      this.cuentasIngresosEgresos(resp.items);
    })
  }


  cuentasIngresosEgresos(IngresosEgresos:Array<IngresoEgreso>){
    this.ingresos=0;
    this.egresos=0;
    this.totalIngresos=0;
    this.totalEgresos=0;

    IngresosEgresos.forEach(ingresoEgreso=>{
      if(ingresoEgreso.tipo==='Ingreso'){
        this.ingresos += ingresoEgreso.monto;
        this.totalIngresos ++;
      }else{
        this.egresos += ingresoEgreso.monto;
        this.totalEgresos ++;
      }
    })
    this.graficaData=[this.ingresos,this.egresos];

  }


}
