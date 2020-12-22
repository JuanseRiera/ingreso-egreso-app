import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { OrdenarIngresoEgresoPipe } from './ordenar-ingreso-egreso.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { IngresoEgresoModuleRouting } from './ingreso-egreso.routing';
import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';



@NgModule({
  declarations: [DetalleComponent,EstadisticaComponent,IngresoEgresoComponent,OrdenarIngresoEgresoPipe,DashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    RouterModule,
    IngresoEgresoModuleRouting,
    StoreModule.forFeature('ingresoEgreso',ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule { }
