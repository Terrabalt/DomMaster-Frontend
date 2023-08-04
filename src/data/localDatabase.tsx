import { Database } from "./database"
import { Receipt } from "../dataclass"


export class LocalDatabase implements Database {
  Receipts : Receipt[] = []
  
  GetReceipt(id: number): Promise<Receipt> {
    return new Promise((resolve, reject) => {
      if (id in this.Receipts)
        resolve(this.Receipts[id])
      else
        reject(Error("404 not found"))
    })
  }
  GetReceipts(): Promise<Receipt[]> {
    return new Promise((resolve) => {
        resolve(this.Receipts)
    })
  }
  
  UpdateReceipt(id: number, receipt:Receipt): Promise<Receipt> {
    return new Promise((resolve, reject) => {
      if (id <= this.Receipts.length) {
        this.Receipts[id] = receipt
        resolve(this.Receipts[id])
      }
      else
        reject(Error("404 not found"))
    })
  }
  AddReceipt(receipt:Receipt): Promise<Receipt> {
    return new Promise((resolve) => {
      const inserted = new Receipt(this.Receipts.length.toString(), receipt.title, receipt.items, receipt.date)
      this.Receipts.push(inserted)
      resolve(inserted)
    })
  }
  DeleteReceipt(id: number): Promise<Receipt> {
    return new Promise((resolve, reject) => {
      if (id <= this.Receipts.length) {
        const deleted = this.Receipts.splice(id, 1)
        resolve(deleted[0])
      }
      else
        reject(Error("404 not found"))
    })
  }
}
