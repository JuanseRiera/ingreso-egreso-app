import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { DetalleComponent } from "./detalle/detalle.component";
import { EstadisticaComponent } from "./estadistica/estadistica.component";
import { IngresoEgresoComponent } from './ingreso-egreso.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "", component: EstadisticaComponent },
      { path: "detalle", component: DetalleComponent },
      { path: "estadisticas", component: EstadisticaComponent },
      { path: "ingreso-egreso", component: IngresoEgresoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoEgresoModuleRouting {}
