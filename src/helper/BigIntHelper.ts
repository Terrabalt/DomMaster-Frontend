/* eslint-disable @typescript-eslint/no-explicit-any */
export function BigIntReplacer(key: string, value: any) : any {
  if (typeof value === 'bigint') {
    return {
      type: 'bigint',
      value: value.toString()
    };
  }
  return value;
}

export function BigIntReviver(key: string, value: any) : any {
  if (value && value.type == 'bigint') {
    return BigInt(value.value);  
  }
  return value;
}