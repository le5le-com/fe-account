import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from './home.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  type = 'login';
  github = {
    code: '',
    state: ''
  };
  constructor(
    private _service: HomeService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _coreService: CoreService
  ) {}

  async ngOnInit() {
    this.github.code = this._activateRoute.snapshot.queryParams['code'] || '';
    this.github.state = this._activateRoute.snapshot.queryParams['state'] || '';
    if (!this.github.code) {
      return;
    }

    const ret = await this._service.OAuthGithub({
      code: this.github.code,
      state: this.github.state,
      r: localStorage.getItem('rememberMe') || ''
    });
    if (ret) {
      this._coreService.saveToken(ret);
    } else {
      this.github = {
        code: '',
        state: ''
      };
      this._router.navigateByUrl('/');
    }
  }
}
