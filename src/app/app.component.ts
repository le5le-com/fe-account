import { Component, OnInit, OnDestroy } from '@angular/core';

import { StoreService } from 'le5le-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  user: any;
  user$: any;

  showService = false;
  constructor(private storeService: StoreService) {}

  async ngOnInit(): Promise<void> {
    this.user = this.storeService.get('user');
    this.user$ = this.storeService.get$('user').subscribe(ret => {
      this.user = ret;
    });
  }

  onService() {
    this.showService = true;
  }

  onSignout() {
    this.storeService.set('auth', -1);
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }
}
