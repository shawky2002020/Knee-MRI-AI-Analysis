export const BASEURL = 'http://localhost:3000';

//Users urls
export const USERS_BASE = BASEURL + '/v1/auth';
export const USERS_REGISTER = USERS_BASE + '/register';
export const USERS_LOGIN = USERS_BASE + '/login';

//Mri-Scsn urls
export const MRI_BASE = BASEURL + '/v1/mri';
export const MRI_UPLOAD = MRI_BASE + '/upload';
export const MRI_GET_SCANS = MRI_BASE + '/scans';
