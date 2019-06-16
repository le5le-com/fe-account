import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { StoreService, CookieService } from 'le5le-store';

import { NoticeService } from 'le5le-components';
import { HttpService } from '../http/http.service';
import { environment } from '../../environments/environment';
import { CoreService } from './core.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
  providers: [NoticeService, HttpService]
})
export class CoreModule {
  private socket: WebSocket;
  private socketCallback: any = {};
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule,
    private _router: Router,
    private _storeService: StoreService,
    private _httpService: HttpService,
    private _coreService: CoreService
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }

    this._storeService.set('author', 'alsmile');

    // 监听用户认证
    this._storeService.get$('auth').subscribe(ret => {
      // 认证失败
      if (ret === -1) {
        localStorage.removeItem(environment.token);
        CookieService.delete(environment.token, {
          domain: document.domain
            .split('.')
            .slice(-2)
            .join('.')
        });

        if (location.pathname.indexOf('/user') > -1) {
          this._router.navigate(['/'], {
            queryParams: { cb: encodeURIComponent(window.location.href) }
          });
        }

        this._storeService.set('user', null);
      } else if (ret === 1) {
        this._router.navigateByUrl('/user');
      }
    });

    // 监听是否需要重定向
    this._storeService.get$('redirect').subscribe(ret => {
      if (ret) {
        this._router.navigateByUrl(ret);
      }
    });

    this.onProfile();
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }

  initWebsocket() {
    // 连接websocket
    const wsUrl: string = (location.protocol === 'http:' ? 'ws://' : 'wss://') + location.host + '/ws';
    this.socket = new WebSocket(wsUrl);
    this._storeService.set('socket', this.socket);
    this._storeService.set('socketCallback', this.socketCallback);
    this.socket.onmessage = (e: any) => {
      if (!e.data) {
        return;
      }

      const msg: any = JSON.parse(e.data);
      if (msg && this.socketCallback[msg.cb]) {
        this.socketCallback[msg.cb](msg);
      }
    };

    // this.socket.onopen = (event: any) => {};

    this.socket.onclose = (event: any) => {
      console.log('websocket close and reconneting...');
      this.initWebsocket();
    };
  }

  notice(msg) {
    const _noticeService: NoticeService = new NoticeService();
    _noticeService.notice({
      body: msg.message,
      theme: 'system-notice',
      timeout: 999999
    });
  }

  async onProfile(): Promise<void> {
    const ret = await this._httpService.Get('/api/user/profile');
    if (!ret.error) {
      this._storeService.set('user', ret);
      this.initWebsocket();

      if (location.pathname.indexOf('/user') !== 0) {
        this._coreService.goUser();
      }
    }
  }
}
