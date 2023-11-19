import React, { useMemo, useState } from 'react';
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
  const [prevSelectionStart, setPrevSelectionStart] = useState<number|null>(null)
  const [prevSelectionEnd, setPrevSelectionEnd] = useState<number|null>(null)
  const [resetSelection, setResetSelection] = useState(false)
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
    } catch (err) {
      if (err instanceof SyntaxError) {
        setResetSelection(true)
        return
      }
      else throw err
    }
  }

  return (
    <>
      <select
        style={{maxWidth:45}}
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
        onSelect={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (resetSelection) {
            e.target.setSelectionRange(prevSelectionStart, prevSelectionEnd)
            setResetSelection(false)
          }
          
          if (prevSelectionStart != e.target.selectionStart || prevSelectionEnd != e.target.selectionEnd) {
            setPrevSelectionStart(e.target.selectionStart)
            setPrevSelectionEnd(e.target.selectionEnd)
          }
        }}
        aria-label={CurrencySymbol(value.currency)}
        name="newItemCost"
        value={inputText}
        onChange={handleChange}
        validators={validators}
      />
    </>
  )
}