import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/types/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit,OnDestroy{

  cargando:Boolean=false;
  subscription:Subscription;

  constructor(public AuthService:AuthService,private router:Router,private alertService:AlertService,private store:Store<AppState>) { }

  ngOnInit(): void {
    this.subscription=this.store.select('ui').subscribe((resp)=>this.cargando=resp.isLoading);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  crearUsuario(data){
    this.AuthService.crearUsuario(data).then(resp=>{
      this.router.navigate(['/login']);
    }).catch(err=>{
      this.alertService.error("Se produjo un error al crear el usuario, por favor inténtelo devuelta más tarde");
    })    
  }

}
