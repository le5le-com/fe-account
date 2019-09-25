import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';

@Injectable()
export class UserProfileService {
  public constructor(protected http: HttpService) {}

  async Detail() {
    const ret = await this.http.Get('/api/user/detail');
    if (ret.error) {
      return {};
    }

    return ret;
  }

  async Profile(params: any) {
    const ret = await this.http.Put('/api/user/profile', params);
    if (ret.error) {
      return false;
    }

    return ret;
  }

  async Password(params: any) {
    const ret = await this.http.Put('/api/user/password', params);
    if (!ret || ret.error) {
      return false;
    }

    return true;
  }

  async GetPhoneCode(params: any) {
    const ret = await this.http.QueryString(params).Get('/api/phone/sms');
    if (ret.error) {
      return false;
    }

    return true;
  }

  async GetEmailCode(params: any) {
    const ret = await this.http.QueryString(params).Get('/api/email/sms');
    if (ret.error) {
      return false;
    }

    return true;
  }

  async SavePhone(params: any) {
    const user: any = Object.assign({}, params);
    user.captcha = user.code;
    const ret = await this.http.Put('/api/user/phone', user);
    if (ret.error) {
      return false;
    }

    return true;
  }

  async SaveEamil(params: any) {
    const user: any = Object.assign({}, params);
    user.captcha = user.code;
    const ret = await this.http.Put('/api/user/email', user);
    if (ret.error) {
      return false;
    }

    return true;
  }
}
