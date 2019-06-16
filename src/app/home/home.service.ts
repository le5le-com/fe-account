import { Injectable } from '@angular/core';

import { HttpService } from 'src/app/http/http.service';

@Injectable()
export class HomeService {
  constructor(protected http: HttpService) {}

  async OAuthGithub(params: any) {
    const ret = await this.http.QueryString(params).Get('/api/oauth/github');
    if (ret.error) {
      return null;
    }

    return ret;
  }
}
