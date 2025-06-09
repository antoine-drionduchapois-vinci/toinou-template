import { Base } from './base.model';

export class UserToken extends Base<UserToken> {
  application: string;
  ipAddress: string;

  lastUsedDate: Date;
}
