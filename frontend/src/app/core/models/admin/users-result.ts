import { User } from "../user.model";

export interface usersResponse {
    users: User[];
    page: number;
    limit: number;
    totalPages: number;
    totalUsers: number;
  }
    