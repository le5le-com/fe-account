import { Injectable } from '@angular/core';

import { HttpService } from 'src/app/http/http.service';

@Injectable()
export class PasswordService {
  constructor(protected http: HttpService) {}

  async GetCode(params: any) {
    let url = '/api/phone/sms';
    const user: any = Object.assign({}, params);
    if (user.phone.indexOf('@') > 0) {
      user.email = user.phone;
      user.phone = '';
      url = '/api/email/sms';
    }
    user.type = 'forgetPwd';
    const ret = await this.http.QueryString(user).Get(url);
    if (ret.error) {
      return false;
    }

    return true;
  }

  async Password(params: any) {
    const user: any = Object.assign({}, params);
    if (user.phone.indexOf('@') > 0) {
      user.email = user.phone;
      user.phone = '';
    }
    user.captcha = user.code;
    user.username = user.email || user.phone;
    const ret = await this.http.Post('/api/password', user);
    if (ret.error) {
      return null;
    }

    return ret;
  }
}
