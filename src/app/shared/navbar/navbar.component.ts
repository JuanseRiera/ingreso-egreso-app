import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/types/types.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy{

  nombre:string='';
  subscripcion:Subscription=new Subscription();

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.subscripcion=this.store.select('auth').pipe(filter(resp=> resp != null && resp.user != null)).subscribe(resp=>{
      this.nombre=resp.user.nombre;
    })
  }

  ngOnDestroy(){
    this.subscripcion.unsubscribe();
  }

}
