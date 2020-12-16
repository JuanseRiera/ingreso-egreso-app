import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public AuthService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  crearUsuario(data){
    this.AuthService.crearUsuario(data).then(resp=>{
      console.log(resp); 
      this.router.navigate(['/dashboard'])   
    }).catch(err=>{
      console.error(err);
    })    
  }

}
