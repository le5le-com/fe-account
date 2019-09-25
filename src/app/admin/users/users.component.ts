import { OnInit, OnDestroy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NoticeService } from 'le5le-components/notice';
import { StoreService } from 'le5le-store';

import { AdminUsersService } from './users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: 'users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [AdminUsersService]
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  constructor(
    private service: AdminUsersService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private storeService: StoreService
  ) {}
  search = {
    username: '',
    phone: '',
    email: '',
    pageIndex: 1,
    pageCount: 10,
    r: 1
  };
  data = {
    list: [],
    count: 0
  };
  loading = true;

  user: any;
  user$: any;

  route$: any;
  async ngOnInit() {
    this.user = this.storeService.get('user');
    this.user$ = this.storeService.get$('user').subscribe(ret => {
      this.user = ret;
    });

    this.route$ = this.activateRoute.queryParamMap.subscribe(params => {
      this.search.username = params.get('username') || '';
      this.search.phone = params.get('phone') || '';
      this.search.email = params.get('email') || '';
      this.search.pageIndex = +params.get('pageIndex') || 1;
      this.search.pageCount = +params.get('pageCount') || 10;
      this.list();
    });
  }

  async list(pageIndex?: number) {
    if (pageIndex > 0) {
      this.search.pageIndex = pageIndex;
      this.loading = true;
    }

    this.data = await this.service.List(this.search);
    this.loading = false;
  }

  onVip(item: any) {
    const noticeService: NoticeService = new NoticeService();
    noticeService.input({
      title: '设置VIP',
      text: '366',
      placeholder: '请输入新增会员天数',
      required: true,
      type: 'number',
      callback: async ret => {
        if (!ret) {
          return;
        }

        if (
          await this.service.Put('vip', {
            userId: item.id,
            vip: item.vip || 1,
            vipExpiry: Math.ceil(new Date(item.vipExpiry).getTime() / 1000),
            days: +ret
          })
        ) {
          noticeService.notice({
            theme: 'success',
            body: '设置成功!'
          });
          this.list();
        }
      }
    });
  }

  onRole(item: any) {
    const noticeService: NoticeService = new NoticeService();
    noticeService.input({
      title: '设置角色',
      text: item.role,
      placeholder: '请输入角色',
      callback: async (ret: string) => {
        if (
          await this.service.Put('role', {
            id: item.id,
            role: ret
          })
        ) {
          noticeService.notice({
            theme: 'success',
            body: '设置成功!'
          });
          this.list();
        }
      }
    });
  }

  onSearch() {
    ++this.search.r;
    this.router.navigate(['/admin', 'users'], {
      queryParams: this.search
    });
  }

  ngOnDestroy() {
    this.route$.unsubscribe();
    this.user$.unsubscribe();
  }
}
