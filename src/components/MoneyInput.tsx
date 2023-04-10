import React from 'react';
import { Money } from '../dataclass';
import { CurrencyDescription, CurrencySymbol, ListCurrencyCodes } from '../currencyCode';

interface Props {
  value: Money;
  onChange: (newValue: Money) => void;
}

export default function MoneyInput({value, onChange}: Props) {
  return (
    <>
      <select
        style={{maxWidth:100}}
        name="newItemCurrency"
        value={value.currency}
        onChange={(e) => onChange(new Money(value.amount, e.target.value))}
      >
        {
          ListCurrencyCodes().map((v, i) => (
            <option key={i} value={v}>{CurrencySymbol(v)} - {CurrencyDescription(v)}</option>
          ))
        }
      </select>
      <input
        aria-label={CurrencySymbol(value.currency)}
        name="newItemCost"
        type="number"
        value={value.amount.toString()}
        onChange={e => onChange(new Money(BigInt(e.target.value), value.currency))}
      />
    </>
  )
}