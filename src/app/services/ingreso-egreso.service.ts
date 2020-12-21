import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AppState, IngresoEgreso, User } from '../types/types.models';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { setItems, unsetItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  authSubscription:Subscription=new Subscription();
  ingresoEgresoSubscription:Subscription=new Subscription();

  constructor(private fbStore:AngularFirestore,private authService:AuthService,private store:Store<AppState>) { }

  crearIngresoEgreso(ingresoEgreso:IngresoEgreso):Promise<any>{
    let user=this.authService.getUser();
    let docRef=this.fbStore.collection(`usuarios/${user.uid}/ingresos_egresos`).ref.doc();
    ingresoEgreso.uid=docRef.id;
    return docRef.set({...ingresoEgreso});
  }

  getAllIngresoEgreso(){
    this.authSubscription = this.store.select('auth').pipe(filter(auth=> auth != null && auth.user != null)).subscribe(auth=>{
      this.setAllItems(auth.user)}); 
  }

  private setAllItems(user){
    this.ingresoEgresoSubscription = this.fbStore.collection(`usuarios/${user.uid}/ingresos_egresos`).valueChanges().subscribe((coleccion:Array<IngresoEgreso>)=>{
      this.store.dispatch(new setItems(coleccion));      
    })
  }

  cancelarSubscripcion(){
    this.authSubscription.unsubscribe();
    this.ingresoEgresoSubscription.unsubscribe();
    this.store.dispatch(new unsetItems());
  }

  borrarIngresoEgreso(id){
    let user = this.authService.getUser();
    return this.fbStore.doc(`usuarios/${user.uid}/ingresos_egresos/${id}`).delete();
  }

}
