export function checkMail(mail) {
  return !!mail && /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(mail);
}
export function checkRequired(str) {
  return !!str && str.length > 0;
}
export function checkYear(str) {
  return !!str && /^\d{4}$/i.test(str);
}
export function toNumber(str) {
  return str.toString().replace(/\D/g, '');
}
