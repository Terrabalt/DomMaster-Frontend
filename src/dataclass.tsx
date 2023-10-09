import { CurrencyCode, CurrencySymbol } from "./currencyCode";
import { getCurrencyPreference } from "./data/settings";

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
  id = "";
  title = "";
  category = "";
  items: ReceiptItem[] = [];
  date: Date = new Date();
  public total () {
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
  public totalToString() {
    const total = this.total()
    return total.length > 0 ?
      total
      .map(v => v.toString())
      .reduce((p, c) => `${p}, ${c}`)
      
    : '-'
  }
}
export type ReceiptItemType = "credit" | "debit";
export const ReceiptItemTypes:ReceiptItemType[] = ["credit", "debit"]
export function ReceiptAssign(...o: unknown[]) : Receipt {
  const receipt = new Receipt();
  Object.assign(receipt, ...o)
  receipt.date = new Date(receipt.date)
  receipt.items = receipt.items.map((v) => ReceiptItemAssign(v))
  return receipt
}

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
  public total() { return this.cost.multiply(this.amount) }
  public totalToString () {
    return this.total().toString()
  }
}
export function ReceiptItemAssign(...o: unknown[]) : ReceiptItem {
  const receiptItem = new ReceiptItem();
  Object.assign(receiptItem, ...o)
  receiptItem.cost = MoneyAssign(receiptItem.cost)
  return receiptItem
}


export class Money {
  amount: bigint;
  currency: CurrencyCode;
  constructor(amount = BigInt(0), currency: CurrencyCode = getCurrencyPreference()) {
    this.amount = amount;
    this.currency = currency;
  }
  public toString() : string { //TODO: Proper formatting with locale
    const sign = BigInt(this.amount < 0 ? -1 : 1);
    const full = (this.amount * sign) / BigInt(100);
    const fraction = Math.abs(Number((this.amount * sign) - (full * BigInt(100))));
    return `${this.amount < 0 ? "-" : ""}${CurrencySymbol(this.currency)}${full},${fraction}`
  }
  public multiply(times: number) : Money {
    return new Money(this.amount * BigInt(times), this.currency)
  }
}
export function MoneyAssign(...o: unknown[]) : Money {
  const money = new Money();
  Object.assign(money, ...o)
  return money
}
