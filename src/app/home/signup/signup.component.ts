import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NoticeService } from 'le5le-components/notice';

import { SignupService } from './signup.service';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService]
})
export class SignupComponent implements OnInit {
  data = {
    username: '',
    phone: '',
    captcha: '',
    code: '',
    password: '',
    rememberMe: false
  };
  code = {
    captcha: '/captcha',
    text: '获取动态码',
    second: 0
  };
  @Output()
  typeChange = new EventEmitter<any>();
  timer;
  constructor(private _service: SignupService, private _coreService: CoreService) {}

  ngOnInit() {
    this.data.rememberMe = !!localStorage.getItem('rememberMe');
  }

  onType(t: any) {
    this.typeChange.emit(t);
  }

  onRefresh() {
    this.code.captcha = '/captcha?t=' + new Date().getTime();
  }

  async onGetCode() {
    if (this.code.second > 0) {
      return;
    }
    const _noticeService: NoticeService = new NoticeService();

    if (!this.data.phone) {
      _noticeService.notice({
        theme: 'error',
        body: '请先填写手机号/邮箱!'
      });
      return;
    }

    if (!this.data.captcha) {
      _noticeService.notice({
        theme: 'error',
        body: '请先填写图形码!'
      });
      return;
    }

    if (await this._service.GetCode(this.data)) {
      _noticeService.notice({
        theme: 'success',
        body: '注册验证码已发送，请在手机或邮箱上查收!'
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

  async onSubmit(invalid: boolean) {
    if (invalid) {
      return;
    }
    const ret = await this._service.Signup(this.data);
    if (ret) {
      this._coreService.saveToken(ret);
      this._coreService.goHome();
    }
  }

  onRemember() {
    if (this.data.rememberMe) {
      localStorage.setItem('rememberMe', '1');
    } else {
      localStorage.removeItem('rememberMe');
    }
  }
}
