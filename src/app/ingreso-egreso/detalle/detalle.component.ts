import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IngresoEgreso } from 'src/app/types/types.models';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import { AlertService } from '../../services/alert.service';
import * as fromUI from '../../shared/ui.actions';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit,OnDestroy {

  subscription:Subscription=new Subscription();
  ingresosEgresos:Array<IngresoEgreso>;
  cargando:boolean=false;

  constructor(private store:Store<AppState>,private IngresoEgresoService:IngresoEgresoService,private AlertService:AlertService) { }

  ngOnInit(): void {
    this.subscription = this.store.subscribe(store=>{
      this.ingresosEgresos=store.ingresoEgreso.items;
      this.cargando=store.ui.isLoading;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  borrarItem(ingresoEgreso:IngresoEgreso){
    this.store.dispatch(new fromUI.ActivarLoadingAction());
    this.IngresoEgresoService.borrarIngresoEgreso(ingresoEgreso.uid).then(()=>{
      this.AlertService.correcto(`${ingresoEgreso.tipo} eliminado correctamente`);
      this.store.dispatch(new fromUI.DesactivarLoadingAction());
    }).catch(()=>{
      let tipo = ingresoEgreso.tipo.toLowerCase();
      this.AlertService.error(`Problema al eliminar ${tipo}, intentelo nuevamente más tarde`);
      this.store.dispatch(new fromUI.DesactivarLoadingAction());
    })
    
  }

}
