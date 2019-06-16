import { OnInit, OnDestroy, Component } from '@angular/core';
import { StoreService } from 'le5le-store';

import { UserService } from './user.service';
import { NoticeService } from 'le5le-components';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-user-center',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService]
})
export class UserComponent implements OnInit, OnDestroy {
  user: any = {};
  subUser: any;

  security = 0.3;
  securityOptions = {
    customDesc: '低'
  };

  password = {
    old: '',
    new: '',
    confirm: '',
    saving: false
  };
  constructor(private _service: UserService, private _storeService: StoreService, private _coreService: CoreService) {}

  async ngOnInit() {
    this.user = await this._service.Detail();
    this.user.usernamePinyin = this._coreService.getPinyin(this.user.username);
    this.getSecurity();
  }

  onSignout() {
    this._storeService.set('auth', -1);
  }

  getSecurity() {
    if (this.user.phone) {
      this.security = 1;
      this.securityOptions.customDesc = '高';
    } else if (this.user.email) {
      this.security = 0.7;
      this.securityOptions.customDesc = '中';
    }
  }

  onEditUsername() {
    const _noticeService: NoticeService = new NoticeService();
    _noticeService.input({
      title: '修改姓名',
      label: '新的姓名',
      theme: 'default',
      text: this.user.username,
      required: true,
      type: 'text',
      callback: async ret => {
        const user = await this._service.Username({
          username: ret
        });
        if (user) {
          this.user.username = ret;
          this.user.usernamePinyin = this._coreService.getPinyin(ret);
          this._storeService.set('user', this.user);
        }
      }
    });
  }

  onEditPhone() {}

  async onPhoneCode(invalid) {
    if (invalid) {
      return;
    }
  }

  async onSavePhone(invalid) {}

  onEditEmail() {}

  async onEmailCode(invalid) {
    if (invalid) {
      return;
    }
  }

  async onSaveEmail(invalid) {}

  async onSavePassword(invalid) {}

  ngOnDestroy() {
    if (this.subUser) {
      this.subUser.unsubscribe();
    }
  }
}
