export class User {
  _id!: string;
  name!: string;
  name_letters?: string;
  gender!: string;
  email!: string;
  password!: string; // Hashed
  role!: 'radiologist' | 'doctor' | 'admin';
  token!: string;
  createdAt?: Date;
  lastLogin?: Date;
  lastLog?: string;
  loginCount?: number;
  scanCount?: number;
  aiAccess?: boolean;
  isGoogleUser?: boolean;
}

export class userResponse {
  token!: string;
  message!: string;
  user!: User;
}
