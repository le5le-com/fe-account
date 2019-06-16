import { Component, OnInit, OnDestroy } from '@angular/core';

import { StoreService } from 'le5le-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user: any;
  sub$: any;
  constructor(private _storeService: StoreService) {}

  async ngOnInit(): Promise<void> {
    // 监听用户信息
    this.sub$ = this._storeService.get$('user').subscribe(ret => {
      this.user = ret;
    });
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
