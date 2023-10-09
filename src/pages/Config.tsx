import React, { useState } from 'react';
import { getCurrencyPreference, getLocale, localeList, setCurrencyPreference, setLocale } from '../data/settings';
import { CurrencyDescription, ListCurrencyCodes } from '../currencyCode';
import { FormattedMessage } from 'react-intl';

interface Props {
  onLogout: () => void;
}

export default function Config({onLogout}:Props) {
  const [locale, setLocaleState] = useState(getLocale())
  const [currencyPreference, setCurrencyPreferenceState] = useState(getCurrencyPreference())
  function onLocaleChange(newLocale: string) {
    setLocale(newLocale)
    setLocaleState(getLocale())
    window.location.reload()
  }

  function onCurrencyPreferenceChange(newCurrencyPreference: string) {
    setCurrencyPreference(newCurrencyPreference)
    setCurrencyPreferenceState(getCurrencyPreference())
  }

  return <div>
    <p>
      <label>
        <FormattedMessage
            description="language-selector-label"
            defaultMessage="Language:" id="nt0Y55"
        />
        <select
          style={{maxWidth:100}}
          name="language"
          value={locale}
          onChange={(e) => onLocaleChange(e.target.value)}
        >
          {
            localeList.map((v, i) => (
              <option key={i} value={v.code}>{v.name}</option>
            ))
          }
        </select>
      </label>
    </p>
    <p>
      <label>
        <FormattedMessage
          description="prefered-currency-selector-label"
          defaultMessage="Prefered currency for new item:" id="e9m7MD"
        />
        <select
          style={{maxWidth:100}}
          name="newItemCurrency"
          value={currencyPreference}
          onChange={(e) => onCurrencyPreferenceChange(e.target.value)}
        >
          {
            ListCurrencyCodes().map((v, i) => (
              <option key={i} value={v}>{CurrencyDescription(v)}</option>
            ))
          }
        </select>
      </label>
    </p>
    <p>
      <button
        id='logout'
        onClick={() => {
          onLogout();
        }}
      >
        <FormattedMessage
          description="logout-button"
          defaultMessage="Logout" id="uVEx/N"
        />
      </button>
    </p>
  </div>
}