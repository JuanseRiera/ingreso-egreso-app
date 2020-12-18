import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertService } from '../../services/alert.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/types/types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit,OnDestroy {

  cargando:boolean=false;
  subscription:Subscription;

  constructor(private AuthService:AuthService,
              private router:Router,
              private alertService:AlertService,
              private store:Store<AppState>) { }

  ngOnInit(): void {
    this.subscription=this.store.select('ui').subscribe((resp)=>this.cargando=resp.isLoading);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  login(data){
    this.AuthService.iniciarSesion(data).then(resp=>{
      this.router.navigate(['/dashboard']);
    }).catch(err=>{
      this.alertService.error("Se produjo un error al crear el usuario, por favor inténtelo devuelta más tarde");
    })    
  }

}
