export function checkMail(mail) {
  return !!mail && /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(mail);
}
export function checkRequired(str) {
  return !!str && str.length > 0;
}
// year range ist limited from 1900 to 2099
export function checkYear(str) {
  return !!str && /^(19|20)\d{2}$/i.test(str);
}
export function checkDate(str) {
  const validFormat = !!str && /^\d{1,2}\.\d{1,2}\.(19|20)\d{2}$/i.test(str);
  if(!validFormat) return false;

  // does date exist?
  const dmy = str.split(".");
  const date = new Date(dmy[2], dmy[1] - 1, dmy[0]);
  return (date.getFullYear() == dmy[2] && date.getMonth() == dmy[1] - 1 && date.getDate() == dmy[0])
}
export function toNumber(str) {
  return str.toString().replace(/\D/g, '');
}
export function toDate(str) {
  return str.toString().replace(/[^0-9.]/g, '');
}
