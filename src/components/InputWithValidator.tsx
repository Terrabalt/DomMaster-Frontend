import React, { InputHTMLAttributes, useEffect, useState } from "react";
import { ValidatorStack } from "../data/withValidator";

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  validators?: ValidatorStack
}

export default function InputWithValidator({ validators = [], onChange, onBlur, value, ...rest }: Props) {
  const [error, setError] = useState<string|undefined>()
  const [finalized, setFinalized] = useState(false)

  useEffect(() => {
    if (finalized) {
      setError(validators.reduce<string | undefined>((previous, validator) => {
        return previous ? previous : validator(value)
      }, undefined))
    }
  }, [finalized])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinalized(false)
    onChange && onChange(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFinalized(true)
    onBlur && onBlur(e)
  }

  return <>
    <input
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      {...rest}
    />
    { error && <div id="error">{error}</div> }
  </>
}

export const requiredValidator = (value?:string | number | readonly string[]) => !value ? "Required" : undefined;