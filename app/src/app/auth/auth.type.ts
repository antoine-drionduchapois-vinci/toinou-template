import { User } from '../models/user.model';

export type AuthResponse = {
  success: boolean;
  message: string;
  data?: User | string | Record<string, any>;
  token?: string;
};
