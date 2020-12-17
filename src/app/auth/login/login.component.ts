import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private AuthService:AuthService,
              private router:Router,
              private alertService:AlertService) { }

  ngOnInit(): void {
  }

  login(data){
    this.alertService.cargando("Iniciando sesión...");
    this.AuthService.iniciarSesion(data).then(resp=>{
      this.router.navigate(['/dashboard']);
      this.alertService.finalizar();
    }).catch(err=>{
      this.alertService.error("Se produjo un error al crear el usuario, por favor inténtelo devuelta más tarde");
    })    
  }

}
