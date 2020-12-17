export class User{
    public nombre:string;
    public email:string;
    public uid:string;

    constructor(nombre,uid,email){
        this.nombre=nombre;
        this.uid=uid;
        this.email=email;
    }
}