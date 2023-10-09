import React, { useEffect, useState } from 'react';
import { getCurrencyPreference, getLocale, localeList, setCurrencyPreference, setLocale } from '../data/settings';
import { CurrencyDescription, ListCurrencyCodes } from '../currencyCode';
import { FormattedMessage } from 'react-intl';
import { BigIntReplacer } from '../helper/BigIntHelper';
import { Database } from '../data/database';

interface Props {
  database: Database;
}

export default function Config({database,}:Props) {
  const [locale, setLocaleState] = useState(getLocale())
  const [currencyPreference, setCurrencyPreferenceState] = useState(getCurrencyPreference())
  const [exportCreated, setExportCreated] = useState(false)
  const [exportObjectUrl, setExportObjectUrl] = useState("")
  
  useEffect(() => {
    database.GetReceipts().then(
      (receipts) => {
        const blob = new Blob([JSON.stringify(receipts, BigIntReplacer)], {
          type: "application/json",
        })
        setExportObjectUrl(URL.createObjectURL(blob))
        setExportCreated(true)
      }, (e) => {
        console.error(`Error creating export; ${e}`)
      }
    )
  })

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
      <a
        href={exportObjectUrl}
        download={`DomMaster_${new Date().getTime()}.bak`}
      >
        <button
          id='export-account'
          disabled={!exportCreated}
        >
          <FormattedMessage
            description="export-account-button"
            defaultMessage="Export current account" id="YbkLom"
          />
        </button>
      </a>
    </p>
  </div>
}