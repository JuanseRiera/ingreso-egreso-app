import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { IngresoEgreso } from '../types/types.models';
import * as fromUI from "../shared/ui.actions";
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private fbStore:AngularFirestore,private authService:AuthService,private store:Store ) { }

  crearIngresoEgreso(ingresoEgreso:IngresoEgreso):Promise<any>{
    this.store.dispatch(new fromUI.ActivarLoadingAction());
    let user=this.authService.getUser();
    let docRef=this.fbStore.collection(`usuarios/${user.uid}/ingresos_egresos`).ref.doc();
    ingresoEgreso.uid=docRef.id;
    return docRef.set({...ingresoEgreso}).then((resp)=>{
      this.store.dispatch(new fromUI.DesactivarLoadingAction());
      return resp;
    })
    .catch((err)=>{
      this.store.dispatch(new fromUI.DesactivarLoadingAction());
      return err;
    })
  }
}
