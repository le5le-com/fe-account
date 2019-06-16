import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from './login.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  data = {
    username: '',
    password: '',
    rememberMe: false
  };
  @Output()
  typeChange = new EventEmitter<any>();
  constructor(private _service: LoginService, private _coreService: CoreService) {}

  ngOnInit() {
    this.data.rememberMe = !!localStorage.getItem('rememberMe');
  }

  onType(t) {
    this.typeChange.emit(t);
  }

  async onSubmit(invalid: boolean) {
    if (invalid) {
      return;
    }

    const ret = await this._service.Login(this.data);
    this._coreService.saveToken(ret);
  }

  onRemember() {
    if (this.data.rememberMe) {
      localStorage.setItem('rememberMe', '1');
    } else {
      localStorage.removeItem('rememberMe');
    }
  }
}
