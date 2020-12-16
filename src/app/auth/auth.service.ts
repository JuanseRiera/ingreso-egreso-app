import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
type Usuario={
  email:string,
  nombre:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})



export class AuthService {

  constructor(private firestore: AngularFirestore,
              private afAuth: AngularFireAuth) { }

  crearUsuario(data:Usuario){
    return this.afAuth.createUserWithEmailAndPassword(data.email,data.password);
  }
}
