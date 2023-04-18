export const localeList = [
  { name: 'Bahasa Indonesia', code: 'id' },
  { name: 'English', code: 'en' },
]

let locale = localStorage["locale"] ? localStorage["locale"] : localeList[0].code
export function getLocale(): string {
    return locale
}
export function setLocale(newLocale: string) {
  if (localeList.findIndex((v) => v.code == newLocale) > -1) {
    locale = newLocale
  }
}
