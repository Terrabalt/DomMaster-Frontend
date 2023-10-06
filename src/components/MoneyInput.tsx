import React from 'react';
import { Money } from '../dataclass';
import { CurrencyDescription, CurrencySymbol, ListCurrencyCodes } from '../currencyCode';
import InputWithValidator from './InputWithValidator';
import { ValidatorStack } from '../data/withValidator';

interface Props {
  value: Money;
  onChange: (newValue: Money) => void;
  validators?: ValidatorStack
}

export default function MoneyInput({value, onChange, validators}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(new Money(BigInt(e.target.value), value.currency))
  }

  return (
    <>
      <select
        style={{maxWidth:100}}
        name="newItemCurrency"
        value={value.currency}
        onChange={e => onChange(new Money(value.amount, e.target.value))}
      >
        {
          ListCurrencyCodes().map((v, i) => (
            <option key={i} value={v}>{CurrencySymbol(v)} - {CurrencyDescription(v)}</option>
          ))
        }
      </select>
      <InputWithValidator
        aria-label={CurrencySymbol(value.currency)}
        name="newItemCost"
        type="number"
        value={value.amount.toString()}
        onChange={handleChange}
        validators={validators}
      />
    </>
  )
}