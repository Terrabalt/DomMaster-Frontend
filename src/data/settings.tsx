import { CurrencyCode, ListCurrencyCodes } from "../currencyCode"

export const localeList = [
  { name: 'Bahasa Indonesia', code: 'id' },
  { name: 'English', code: 'en' },
]

const locale = "locale"
const currencyPreference = "c_prefer"
export function getLocale(): string {
  localStorage[locale]
    return localStorage[locale] ? localStorage[locale] : localeList[0].code
}
export function setLocale(newLocale: string) {
  if (localeList.findIndex((v) => v.code == newLocale) > -1) {
    localStorage.setItem(locale, newLocale)
  }
}
export function getCurrencyPreference(): CurrencyCode {
    return localStorage[currencyPreference] ? localStorage[currencyPreference] : 'IDR'
}
export function setCurrencyPreference(newPreference: CurrencyCode) {
  if (ListCurrencyCodes().findIndex((v) => newPreference == v) > -1) {
    localStorage.setItem(currencyPreference, newPreference)
  }
}
