import Swal from "sweetalert2";
import { Injectable } from "@angular/core";
import { NONE_TYPE } from "@angular/compiler";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor() {}

  error(msj: string) {
    Swal.fire("Error", msj, "error");
  }

  correcto(msj){
      Swal.fire("Exito",msj,'success');
  }

  cargando(msj: string) {
    Swal.fire({
      title: msj,
      icon:'info',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
  }

  finalizar() {
    Swal.close();
  }
}
