import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate, PreloadAllModules } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path:'dashboard',
    canLoad: [AuthGuardService],
    canActivate: [AuthGuardService],
    loadChildren: () =>
    import("./ingreso-egreso/ingreso-egreso.module").then(
    (m) => m.IngresoEgresoModule
  ),
},
  { path: "**", redirectTo: "/dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
