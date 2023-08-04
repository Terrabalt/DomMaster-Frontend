import React from 'react';
import { getLocale, localeList, setLocale } from '../data/locale';

interface Props {
  onLogout: () => void;
}

export default function Config({onLogout}:Props) {
  
  return <div>
    <p>
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
    </p>
    <p>
      <button
        id='logout'
        onClick={() => {
          onLogout();
        }}
      >Logout</button>
    </p>
  </div>
}