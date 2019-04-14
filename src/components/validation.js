export function checkMail(mail) {
  return /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(mail);
}
export function checkRequired(str) {
  return !!str && str.length>0;
}
