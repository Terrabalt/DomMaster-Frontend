import { useCallback, useState } from "react";

export type ValidateError = string | undefined 
export type Value = string | number | readonly string[] | undefined
export type ValidatorFunc = (value?:Value) => ValidateError
export type ValidatorStack = ValidatorFunc[]
export const Validate = (value?:Value, validators : ValidatorStack = []) => {
  return validators.reduce<ValidateError>((previous, validator) => {
    return previous ? previous : validator(value)
  }, undefined)
}

export default function withValidator(validators : ValidatorFunc[]) : [boolean, ValidatorFunc] {
  const [validated, setValidated] = useState(false)
  const validator = useCallback((value?:Value) => {
    const error = Validate(value, validators)
    setValidated(error == undefined)
    return error
  }, [validators])

  return [validated, validator]
} 

export const requiredValidator : ValidatorFunc = (value) => {
  console.log("a")
  return !value ? "Required field" : undefined;
}