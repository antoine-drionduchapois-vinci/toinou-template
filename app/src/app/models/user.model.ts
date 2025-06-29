import { Base } from './base.model';

export enum UserRole {
  Admin = 'admin', // Super Admin

  // Company roles
  CompanyAdmin = 'company-admin', // Company Admin
  ProjectManager = 'project-manager', // Project Manager
  Supervisor = 'supervisor', // Supervisor

  User = 'user',
}

export class User extends Base<User> {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  password?: string;
  isActive?: boolean;

  static create(model?: Partial<User>) {
    return new User({
      role: UserRole.User,
      isActive: true,
      ...model,
    });
  }

  get name() {
    const items = [];
    if (this.firstName) {
      items.push(this.firstName);
    }
    if (this.lastName) {
      items.push(this.lastName);
    }
    return items.join(' ');
  }
}
