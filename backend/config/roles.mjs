export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const PERMISSIONS = {
  MANAGE_USERS: [ROLES.ADMIN], // Only admin can manage users
  UPLOAD_SCANS: [ROLES.USER, ROLES.ADMIN], // Both roles can upload scans
  VIEW_REPORTS: [ROLES.USER, ROLES.ADMIN], // Both roles can view reports
};
