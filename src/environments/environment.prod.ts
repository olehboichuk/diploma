export const environment = {
  production: true,
  apiUrl: '',
  socketUrl: 'https://duo-code.herokuapp.com'
};

export const AUTH_API = {
  login: '/api/v1/login',
  register: '/api/v1/register',
  logout: '/api/v1/logout'
};

export const FILE_API = {
  files: '/api/v1/files',
  file: '/api/v1/file',
  link: '/api/v1/file/link'
};
