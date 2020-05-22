import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from 'le5le-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user: any;
  user$: any;

  showService = false;
  constructor() { }

  async ngOnInit(): Promise<void> {
    this.user$ = Store.subscribe('user', ret => {
      this.user = ret;
    });
  }

  onService() {
    this.showService = true;
  }

  onSignout() {
    Store.set('auth', -1);
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }
}
