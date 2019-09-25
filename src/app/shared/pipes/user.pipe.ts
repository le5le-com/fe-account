import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vip'
})
export class VipPipe implements PipeTransform {
  constructor() {}

  transform(val: number) {
    switch (val) {
      case 1:
        return '普通会员';
        break;
      case 2:
        return '超级会员';
        break;
      case 3:
        return '企业会员';
        break;
    }
    return '';
  }
}
