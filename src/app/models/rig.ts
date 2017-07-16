// import { Address } from '../models';
import { UuidUtil } from '../utils';

export class Rig {
  id: string;
  name: string;
  // addresses: Address[];
  constructor(data: any = {}) {
    this.id = data.id ? data.id : UuidUtil.generate();
    this.name = data.name ? data.name : '';
    // this.addresses = data.addresses && data.addresses.length > 0 ? data.addresses.map(a => new Address(a)) : [];
  }
}
