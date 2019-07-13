import { OnInit, OnDestroy, Component } from '@angular/core';
import { StoreService } from 'le5le-store';

import { UserService } from './user.service';
import { NoticeService } from 'le5le-components/notice';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-user-center',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService]
})
export class UserComponent implements OnInit, OnDestroy {
  user: any = {};

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

  phone: {
    phone: string;
    captcha: string;
    code: string;
  };

  email: {
    email: string;
    captcha: string;
    code: string;
  };

  code = {
    captcha: '/captcha',
    text: '获取动态码',
    second: 0
  };

  showService = false;

  timer;
  constructor(private _service: UserService, private _storeService: StoreService, private _coreService: CoreService) {}

  async ngOnInit() {
    this.user = await this._service.Detail();
    this.user.usernamePinyin = this._coreService.getPinyin(this.user.username);
    if ((new Date(this.user.vipExpiry).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000) < 30) {
      this.user.isExpiry = true;
    }
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
      title: '修改昵称',
      label: '新的昵称',
      theme: 'default',
      text: this.user.username,
      required: true,
      type: 'text',
      callback: async username => {
        const ret = await this._service.Profile({
          username
        });
        if (ret) {
          this.user.username = username;
          this.user.usernamePinyin = this._coreService.getPinyin(username);
          this._storeService.set('user', this.user);
        }
      }
    });
  }

  onEditPhone() {
    this.phone = {
      phone: '',
      captcha: '',
      code: ''
    };
  }

  onRefresh() {
    this.code.captcha = '/captcha?t=' + new Date().getTime();
  }

  async onPhoneCode() {
    const _noticeService: NoticeService = new NoticeService();
    if (!this.phone.phone) {
      _noticeService.notice({
        theme: 'error',
        body: '请先填写手机号!'
      });
      return;
    }

    if (this.user.phone === this.phone.phone) {
      _noticeService.notice({
        body: '请填写一个新手机号！',
        theme: 'error'
      });
      return;
    }

    if (!this.phone.captcha) {
      _noticeService.notice({
        theme: 'error',
        body: '请先填写图形码!'
      });
      return;
    }

    if (await this._service.GetPhoneCode(this.phone)) {
      _noticeService.notice({
        theme: 'success',
        body: '注册验证码已发送，请在手机上查收!'
      });
      this.code.second = 60;
      this.timer = setInterval(() => {
        if (--this.code.second > 0) {
          this.code.text = this.code.second + '秒后重试';
        } else {
          this.code.text = '获取动态码';
          clearInterval(this.timer);
        }
      }, 1000);
    } else {
      this.onRefresh();
    }
  }

  async onSavePhone(invalid: boolean) {
    if (invalid) {
      return;
    }

    const ret = await this._service.SavePhone(this.phone);
    if (ret) {
      this.user.phone = this.phone.phone;
      this._storeService.set('user', this.user);
      this.phone = null;
    }
  }

  onEditEmail() {
    this.email = {
      email: '',
      captcha: '',
      code: ''
    };
  }

  async onEmailCode() {
    const _noticeService: NoticeService = new NoticeService();
    if (!this.email.email) {
      _noticeService.notice({
        theme: 'error',
        body: '请先填写邮箱!'
      });
      return;
    }

    if (this.user.email === this.email.email) {
      _noticeService.notice({
        body: '请填写一个新邮箱！',
        theme: 'error'
      });
      return;
    }

    if (!this.email.captcha) {
      _noticeService.notice({
        theme: 'error',
        body: '请先填写图形码!'
      });
      return;
    }

    if (await this._service.GetEmailCode(this.email)) {
      _noticeService.notice({
        theme: 'success',
        body: '注册验证码已发送，请前往邮箱查收!'
      });
      this.code.second = 60;
      this.timer = setInterval(() => {
        if (--this.code.second > 0) {
          this.code.text = this.code.second + '秒后重试';
        } else {
          this.code.text = '获取动态码';
          clearInterval(this.timer);
        }
      }, 1000);
    } else {
      this.onRefresh();
    }
  }

  async onSaveEmail(invalid: boolean) {
    if (invalid) {
      return;
    }

    const ret = await this._service.SaveEamil(this.email);
    if (ret) {
      this.user.email = this.email.email;
      this._storeService.set('user', this.user);
    }

    this.email = null;
  }

  async onSavePassword(invalid: boolean) {
    if (invalid) {
      return;
    }

    const ret = await this._service.Password(this.password);
    if (ret) {
      const _noticeService: NoticeService = new NoticeService();
      _noticeService.notice({
        theme: 'success',
        body: '修改密码成功!'
      });
    }
  }

  onService() {
    this.showService = true;
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
