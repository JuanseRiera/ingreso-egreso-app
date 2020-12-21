export class User {
  public nombre: string;
  public email: string;
  public uid: string;

  constructor(data: DataUserObj) {
    this.nombre = (data && data.nombre) || null;
    this.uid = (data && data.uid) || null;
    this.email = (data && data.email) || null;
  }
}

export class DataUserObj {
  public nombre: string;
  public email: string;
  public uid: string;
}

export class IngresoEgreso {
  public descripcion: string;
  public monto: number;
  public tipo: tipoIngresoEgreso;
  public uid?: string;

  constructor(data: DataIngresoEgresoObj) {
    this.descripcion = (data && data.descripcion) || null;
    this.monto = (data && data.monto) || null;
    this.tipo = (data && data.tipo) || null;
    this.uid = (data && data.uid) || null;
  }
}

export class DataIngresoEgresoObj {
  public descripcion: string;
  public monto: number;
  public tipo: tipoIngresoEgreso;
  public uid?: string;
}

export type tipoIngresoEgreso = "Ingreso" | "Egreso";

export class dataIngresoEgreso{
  items: Array<IngresoEgreso>;
}

export class State {
  public isLoading: boolean;
}

export class AppState {
  public ui: State;
  public auth: AuthState;
  public ingresoEgreso: dataIngresoEgreso;
}

export class AuthState {
  public user: User;
}
