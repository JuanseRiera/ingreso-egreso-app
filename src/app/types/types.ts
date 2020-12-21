export class User {
  public nombre: string;
  public email: string;
  public uid: string;

  constructor(data: DataObj) {
    this.nombre = data.nombre;
    this.uid = data.uid;
    this.email = data.email;
  }
}
export class DataObj {
  public nombre: string;
  public email: string;
  public uid: string;
}
export class State {
  public isLoading: boolean;
}

export class AppState {
  public ui: State;
  public auth: AuthState;
}

export class AuthState {
  public user: User;
}
