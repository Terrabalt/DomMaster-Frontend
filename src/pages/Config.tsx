import React from 'react';
import { getLocale, localeList, setLocale } from '../data/locale';

export default function Config() {
  
  return <>
    <label>
      Language:
    <select
        style={{maxWidth:100}}
        name="newItemCurrency"
        value={getLocale()}
        onChange={(e) => setLocale(e.target.value)}
      >
        {
          localeList.map((v, i) => (
            <option key={i} value={v.code}>{v.name}</option>
          ))
        }
      </select>
    </label>
  </>
}