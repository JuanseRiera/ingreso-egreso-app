import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ingresoEgresoApp';

  // tslint:disable-next-line: no-shadowed-variable
  constructor(private AuthService: AuthService) {}

  ngOnInit() {
    this.AuthService.initAuthListener();
  }
}
