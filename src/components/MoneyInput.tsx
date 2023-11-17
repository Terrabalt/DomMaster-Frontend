import React, { useMemo } from 'react';
import { Money } from '../dataclass';
import { CurrencyDescription, CurrencySymbol, ListCurrencyCodes } from '../currencyCode';
import InputWithValidator from './InputWithValidator';
import { ValidatorStack } from '../data/withValidator';
import { DecimalMark } from '../data/const';

interface Props {
  value: Money;
  onChange: (newValue: Money) => void;
  validators?: ValidatorStack
}

export default function MoneyInput({value, onChange, validators}: Props) {
  const inputText = useMemo(() => {
    const whole = value.amount / BigInt(100)
    const decimal = value.amount % BigInt(100)

    return `${whole}${DecimalMark}${decimal.toString().padStart(2, "0")}`
  }, [value.amount])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const decimalMarkRemoved = (e.target.value as string).replace(DecimalMark, "")
      const bigInt = BigInt(decimalMarkRemoved)
      onChange(new Money(bigInt, value.currency))
    } catch (e) {
      if (e instanceof SyntaxError) return
      else throw e
    }
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
        value={inputText}
        onChange={handleChange}
        validators={validators}
      />
    </>
  )
}