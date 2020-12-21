import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/types/types.models';
import { AuthService } from '../../services/auth.service';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit,OnDestroy {

  nombre:string='';
  subscripcion:Subscription=new Subscription();

  constructor(private store:Store<AppState>,private AuthService:AuthService,private ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit(): void {
    this.subscripcion=this.store.select('auth').pipe(filter(resp=> resp != null && resp.user != null)).subscribe(resp=>{
      this.nombre=resp.user.nombre;
    })
  }

  ngOnDestroy(){
    this.subscripcion.unsubscribe();
  }
  logout(){
    this.ingresoEgresoService.cancelarSubscripcion();
    this.AuthService.logout();
  }

}
