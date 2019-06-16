import { Injectable } from '@angular/core';

import { HttpService } from 'src/app/http/http.service';

@Injectable()
export class LoginService {
  constructor(protected http: HttpService) {}

  async Login(params: any) {
    const ret = await this.http.Post('/api/login', params);
    if (ret.error) {
      return null;
    }

    return ret;
  }
}
