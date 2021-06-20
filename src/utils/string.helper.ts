import jwt from 'jwt-decode';

export function jwtDecode(
  token = '',
): { id: string; iat: string; exp: string } {
  return jwt(token);
}

export function isLink(txt = '') {
  return /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim.test(
    txt,
  );
}

export function removeUtf8(str = '') {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str.toLowerCase();
}

export function getExtension(str = '') {
  return str.match(/\.[0-9a-z]+$/i)?.[0] || '?';
}

export function textShift(txt?: string) {
  return (
    txt?.split('')?.shift() || Math.random().toString(16).split('').shift()
  );
}

export function verifyPhone(txt: string) {
  return /\+65(6|8|9)\d{7}/g.test(txt);
}

export function verifyEmail(txt: string) {
  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
    txt,
  );
}

/**
 * Convert Strings from camelCase to kebab-case
 * @returns {string}
 * @param input
 */
export function camelToKebab(input: string) {
  return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

/**
 * Convert Strings from kebab-case to camelCase
 * @returns {string}
 * @param input
 */
export function kebabToCamel(input: string) {
  return input.replace(/_([a-z])/g, function (g) {
    return g[1].toUpperCase();
  });
}

/**
 * Get Error request
 * @returns {string}
 */
export function getErrorString(error: any) {
  return error?.message || '';
}
