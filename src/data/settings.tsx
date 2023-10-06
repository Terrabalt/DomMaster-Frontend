import { CurrencyCode, ListCurrencyCodes } from "../currencyCode"
import { Database } from "./database"
import { LocalDatabase } from "./localDatabase"

export const localeList = [
  { name: 'Bahasa Indonesia', code: 'id' },
  { name: 'English', code: 'en' },
]

const locale = "locale"
const currencyPreference = "c_prefer"
const loggedIn = "logged_in"
export function getLocale(): string {
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

export function isLoggedIn(): Database | null {
  switch (localStorage.getItem(loggedIn)) {
    case (new LocalDatabase().Cookie()): {
      const db = new LocalDatabase()
      return db
    }
    case null:
    default:
      return null;
  }
}

export function setLoggedIn(isLoggedIn?: Database) {
  if (isLoggedIn) {
    localStorage.setItem(loggedIn, isLoggedIn.Cookie())
  } else {
    localStorage.removeItem(loggedIn)
  }
}
