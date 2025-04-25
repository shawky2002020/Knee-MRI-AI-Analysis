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

export const REPORT_BASE = BASEURL + '/v1/report';
export const GET_REPORT = REPORT_BASE + '/generate';
