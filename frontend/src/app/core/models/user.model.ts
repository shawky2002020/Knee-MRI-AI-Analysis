export class User {
  _id!: string;
  name!: string;
  gender!: string;
  email!: string;
  password!: string; // Hashed
  role!: 'radiologist' | 'doctor' | 'admin';
  token!: string;
  createdAt?: Date;
  lastLogin?: Date;
  loginCount?: number;
  scanCount?: number;
}

export class userResponse {
  token!: string;
  message!: string;
  user!: User;
}
