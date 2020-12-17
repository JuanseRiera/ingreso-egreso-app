import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public AuthService:AuthService,private router:Router,private alertService:AlertService) { }

  ngOnInit(): void {
  }

  crearUsuario(data){
    this.alertService.cargando('Creando usuario...');
    this.AuthService.crearUsuario(data).then(resp=>{
      this.alertService.correcto("Se creo el usuario correctamente");
      this.router.navigate(['/login']);
    }).catch(err=>{
      this.alertService.error("Se produjo un error al crear el usuario, por favor inténtelo devuelta más tarde");
    })    
  }

}
