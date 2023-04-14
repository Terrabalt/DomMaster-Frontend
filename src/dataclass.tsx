import { CurrencyCode, CurrencySymbol } from "./currencyCode";

export class Wallet {
  id: string;
  name: string;
  amount: Money;
  constructor(id = "", name = "", amount = new Money()) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  }
}

export class Receipt {
  id: string;
  title: string;
  items: ReceiptItem[];
  date: Date;
  constructor(
    id = "",
    title = "",
    items: ReceiptItem[] = [],
    date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.items = items;
    this.date = date;
  }
  public total = () => {
    const temp = new Map<CurrencyCode, bigint>()
    this.items.forEach((item) => {
      switch (item.type) {
        case "credit":
          temp.set(
            item.cost.currency,
            (temp.get(item.cost.currency) ?? BigInt(0)) + item.total().amount
          )
          break;
        case "debit":
          temp.set(
            item.cost.currency,
            (temp.get(item.cost.currency) ?? BigInt(0)) - item.total().amount
          )
          break;
      }
    }) 
    return [...temp.keys()]
      .map<Money>(currency => new Money(temp.get(currency) ?? BigInt(0), currency))
      .filter(v => v.amount != BigInt(0))
  }
  public totalToString = () => {
    const total = this.total()
    return total.length > 0 ?
      total
      .map(v => v.toString())
      .reduce((p, c) => `${p} + ${c}`)
    : '-'
  }
}
export type ReceiptItemType = "credit" | "debit";
export const ReceiptItemTypes:ReceiptItemType[] = ["credit", "debit"]

export class ReceiptItem {
  id: string;
  description: string;
  type: ReceiptItemType;
  cost: Money;
  amount: number;
  constructor(id = "", description = "", type = ReceiptItemTypes[0], cost = new Money(), amount = 0) {
    this.id = id;
    this.description = description;
    this.type = type;
    this.cost = cost;
    this.amount = amount;
  }
  public total = () => { return this.cost.multiply(this.amount) }
  public totalToString = () => {
    return this.total().toString()
  }
}

export class Money {
  amount: bigint;
  currency: CurrencyCode;
  constructor(amount = BigInt(0), currency: CurrencyCode = "IDR") {
    this.amount = amount;
    this.currency = currency;
  }
  public toString = () : string => {
    const full = this.amount / BigInt(100);
    const fraction = this.amount - (full * BigInt(100));
    return `${CurrencySymbol(this.currency)}${full},${fraction}`
  }
  public multiply = (times: number) : Money => {
    return new Money(this.amount * BigInt(times), this.currency)
  }
}