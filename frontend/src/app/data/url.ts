export const BASEURL = 'http://localhost:3000';

//Users urls
export const USERS_BASE = BASEURL + '/v1/auth';
export const USERS_REGISTER = USERS_BASE + '/register';
export const USERS_LOGIN = USERS_BASE + '/login';

//Mri-Scan urls
export const MRI_BASE = BASEURL + '/v1/mri';
export const MRI_UPLOAD = MRI_BASE + '/upload';
export const MRI_DELETE = MRI_BASE + '/delete';
export const MRI_GET_SCANS = MRI_BASE + '/scans';
export const MRI_GET_SCANS_BY_STATUS = MRI_BASE + '/status';
export const MRI_VIEWED = MRI_BASE + '/viewed';


//NOTIFICATOINS
export const NOTIFICATIONS_BASE = BASEURL + '/v1/notifications';
export const NOTIFICATIONS_GET_ALL = NOTIFICATIONS_BASE + '/all';
export const NOTIFICATIONS_ADD = NOTIFICATIONS_BASE + '/add';
export const NOTIFICATIONS_DELETE = NOTIFICATIONS_BASE + '/delete';
export const NOTIFICATIONS_DELETE_ALL = NOTIFICATIONS_BASE + '/deleteAll';

//REPORT
export const REPORT_BASE = BASEURL + '/v1/report';
export const GET_REPORT = REPORT_BASE + '/generate';


//ADMIN
export const ADMIN_BASE = BASEURL + '/v1/admin';

//USERS
export const ADMIN_GET_USERS = ADMIN_BASE + '/users';
export const ADMIN_DELETE_USER = ADMIN_BASE + '/deleteUser';
export const ADMIN_UPDATE_USER = ADMIN_BASE + '/update';
export const ADMIN_GET_REPORTS = ADMIN_BASE + '/reports';
export const ADMIN_GET_USERSTATES = ADMIN_BASE + '/userstates';

//SCANS
export const ADMIN_GET_USERSCANS = ADMIN_BASE + '/userscans';
export const ADMIN_GET_DIAGNOSISDISTRIBUTION = ADMIN_BASE + '/DiagnosisDistribution';

