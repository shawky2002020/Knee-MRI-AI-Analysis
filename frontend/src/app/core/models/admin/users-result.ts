import { User } from "../user.model";

export interface usersResponse {
    users: User[];
    page: number;
    limit: number;
    totalPages: number;
    totalUsers: number;
  }

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  timeRange: string;
}

export interface UsersStatsResponse {
  success: boolean;
  stats: UserStats;
  mostActiveUsers: User[];
  mostRecentUsers:User[];
}
    