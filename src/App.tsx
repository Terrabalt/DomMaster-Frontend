
import { RawIntlProvider, createIntl, createIntlCache } from "react-intl";
import { getLocale, localeList } from "./data/settings";
import React from "react";
import AppRoutes from "./routes";
import { DatabaseContextProvider } from "./data/databaseContext";

const messages = {
  "en": require("./lang/en.json"),
  "id": require("./lang/id.json")
}

const cache = createIntlCache()

export const AppIntl = createIntl(
  {
    // Locale of the application
    locale: getLocale(),
    // Locale of the fallback defaultMessage
    defaultLocale: localeList[0].code,
    messages: messages[getLocale() as keyof typeof messages],
  },
  cache
)

export default function App() {
  return <DatabaseContextProvider>
    <RawIntlProvider key={getLocale()} value={AppIntl}>
      <AppRoutes />
    </RawIntlProvider>
  </DatabaseContextProvider>
}