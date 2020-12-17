import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { User } from '../types/types';
type Usuario={
  email:string,
  nombre?:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  constructor(private firestore: AngularFirestore,
              private afAuth: AngularFireAuth,
              private router:Router) { }

  initAuthListener(){
    this.afAuth.authState.subscribe((fbUser)=>{
      console.log(fbUser);
      
    })
  }

  crearUsuario(data:Usuario){
    return this.afAuth.createUserWithEmailAndPassword(data.email,data.password).then(resp=>{
      const user:User={
        uid:resp.user.uid,
        nombre:data.nombre,
        email:data.email
      }
      return this.firestore.doc(`usuarios/${resp.user.uid}`).set(user);
    })
  }

  iniciarSesion(data:Usuario){
    return this.afAuth.signInWithEmailAndPassword(data.email,data.password);
  }

  logout(){
    this.afAuth.signOut();   
    this.router.navigate(['/login']); 
  }

  isAuth(){
    return this.afAuth.authState.pipe(map(fbUser=>{
      if (fbUser==null) {
        this.router.navigate(['/login']);
      }
      return fbUser != null
    }));
  }
}
