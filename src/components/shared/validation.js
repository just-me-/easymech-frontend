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
  const validFormat1 = !!str && /^\d{1,2}\.\d{1,2}\.(19|20)\d{2}$/i.test(str);
  if (str.includes('-')) {
    return checkDateISO(str);
  }
  if (!validFormat1) return false;

  // does date exist?
  const dmy = str.split('.');
  const date = new Date(dmy[2], dmy[1] - 1, dmy[0]);
  return (
    date.getFullYear() === parseInt(dmy[2], 10)
    && date.getMonth() === parseInt(dmy[1], 10) - 1
    && date.getDate() === parseInt(dmy[0], 10)
  );
}

export function checkDateISO(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) {
    return false;
  }
  return true;
}

export function checkFloat(val) {
  const floatRegex = /^-?\d+(?:[.]\d{0,2}?)?$/;
  if (!floatRegex.test(val)) return false;

  val = parseFloat(val);
  if (isNaN(val)) return false;
  return true;
}

export function toNumber(str) {
  return str.toString().replace(/\D/g, '');
}

export function toDate(str) {
  return str.toString().replace(/[^0-9.]/g, '');
}

export function toFloat(str) {
  const cleanStr = str.toString().replace(/[^\d.]/g, '');
  console.log(str, cleanStr, Number(cleanStr));
  if(cleanStr === "")
    return "";
  return Number(cleanStr).toFixed(2).toString();
}

export function toCurrency(num) {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
