import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { AppState, User } from '../types/types';
import { Store } from "@ngrx/store";
import {
  ActivarLoadingAction,
  DesactivarLoadingAction,
} from "../shared/ui.actions";
import { Subscription } from "rxjs";
import { SetUser } from './auth.actions';
type Usuario = {
  email: string;
  nombre?: string;
  password: string;
};

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private userSubscription:Subscription=new Subscription();

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store<AppState>
  ) {}

  initAuthListener() {
    this.userSubscription=this.afAuth.authState.subscribe((fbUser) => {
      if (fbUser) {
        this.firestore.doc(`usuarios/${fbUser.uid}`).valueChanges().subscribe((resp:any) => {
          let newUser=new User(resp);
          this.store.dispatch(new SetUser(newUser));
        });
      }else{
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(data: Usuario): Promise<any> {
    this.store.dispatch(new ActivarLoadingAction());

    return this.afAuth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((resp) => {
        const user: User = {
          uid: resp.user.uid,
          nombre: data.nombre,
          email: data.email,
        };

        this.firestore
          .doc(`usuarios/${resp.user.uid}`)
          .set(user)
          .then((resp) => {
            this.store.dispatch(new DesactivarLoadingAction());
            return resp;
          })
          .catch((error) => {
            this.store.dispatch(new DesactivarLoadingAction());
            throw error;
          });
      })
      .catch((error) => {
        this.store.dispatch(new DesactivarLoadingAction());
        throw error;
      });
  }

  iniciarSesion(data: Usuario): Promise<any> {
    this.store.dispatch(new ActivarLoadingAction());
    return this.afAuth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((resp) => {
        this.store.dispatch(new DesactivarLoadingAction());
        return resp;
      })
      .catch((err) => {
        this.store.dispatch(new DesactivarLoadingAction());
        throw err;
      });
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(["/login"]);
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map((fbUser) => {
        if (fbUser == null) {
          this.router.navigate(["/login"]);
        }
        return fbUser != null;
      })
    );
  }
}
