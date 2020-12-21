import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { tipoIngresoEgreso, IngresoEgreso, AppState } from '../types/types.models';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AlertService } from '../services/alert.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-ingreso-egreso",
  templateUrl: "./ingreso-egreso.component.html",
  styles: [],
})
export class IngresoEgresoComponent implements OnInit {

  subscription:Subscription = new Subscription();
  cargando:boolean=false;
  form: FormGroup;
  radios: Array<tipoIngresoEgreso> = ["Ingreso","Egreso"];

  constructor(private ingresoEgresoService:IngresoEgresoService,private AlertService:AlertService, private store:Store<AppState>) {}

  ngOnInit(): void {
    this.createForm();
    this.subscription=this.store.select('ui').subscribe((resp)=>this.cargando=resp.isLoading);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = new FormGroup({
      descripcion: new FormControl(null, Validators.required),
      monto: new FormControl(null, [Validators.required, Validators.min(0)]),
      tipo: new FormControl(null, Validators.required),
    });
  }

  guardar(){
    let ingresoEgreso = new IngresoEgreso({...this.form.value});
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(()=>{
      let tipo=(ingresoEgreso.tipo).toLowerCase();
      this.AlertService.correcto(`Se registro el ${tipo} correctamente`);
    })
    .catch(()=>{
      this.AlertService.error("Se produjo un error en la operación, por favor vuelva a intentarlo más tarde");
    })
  }
}
