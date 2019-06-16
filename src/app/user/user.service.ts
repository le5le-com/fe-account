import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable()
export class UserService {
  public constructor(protected http: HttpService) {}

  async Detail() {
    const ret = await this.http.Get('/api/user/detail');
    if (ret.error) {
      return {};
    }

    return ret;
  }

  async Username(params: any) {
    const ret = await this.http.Post('/api/user/username', params);
    if (ret.error) {
      return false;
    }

    return ret;
  }

  async EditPwd(params: any) {
    const ret = await this.http.Put('/api/user/password', params);
    if (!ret || ret.error) {
      return false;
    }

    return true;
  }

  async PhoneCode(params: any) {
    const ret = await this.http.Post('/api/user/sms/send/edit', params);
    if (!ret || ret.error) {
      return false;
    }

    return true;
  }

  async SavePhone(params: any) {
    const ret = await this.http.Put('/api/user/mobile', params);
    if (!ret || ret.error) {
      return false;
    }

    return true;
  }

  async EmailCode(params: any) {
    const ret = await this.http.Post('/api/user/email/send/edit', params);
    if (!ret || ret.error) {
      return false;
    }

    return true;
  }

  async SaveEamil(params: any) {
    const ret = await this.http.Put('/api/user/email', params);
    if (!ret || ret.error) {
      return false;
    }

    return true;
  }

  async SaveAvatar(params: any) {
    const ret = await this.http.Put('/api/user/profile', params);
    if (!ret || ret.error) {
      return false;
    }

    return true;
  }
}
