import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/http/http.service';

@Injectable()
export class AdminUsersService {
  public constructor(protected http: HttpService) {}

  async List(params: any) {
    const ret = await this.http.QueryString(params).Get('/api/users');
    if (ret.error) {
      return { count: 0, list: [] };
    }

    return ret;
  }

  async Put(action: string, params: any) {
    const ret = await this.http.Put('/api/user/' + action, params);
    if (ret.error) {
      return false;
    }

    return true;
  }
}
