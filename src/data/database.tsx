import { Receipt } from "../dataclass";

const RECEIPTS : Receipt[] = []
  
export const getReceipts = (): Promise<Receipt[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    /* TODO */
    resolve(RECEIPTS)
  })
}
export const getReceipt = (id:number): Promise<Receipt> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    /* TODO */
    resolve(RECEIPTS[id])
  })
}
export const updateReceipt = (id: number, receipt: Receipt): Promise<Receipt> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    /* TODO */
    RECEIPTS[id] = receipt
    resolve(RECEIPTS[id])
  })
}
export const addReceipt = (receipt: Receipt): Promise<Receipt> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    /* TODO */
    const inserted = new Receipt(RECEIPTS.length.toString(), receipt.title, receipt.items, receipt.date)
    RECEIPTS.push(inserted)
    resolve(inserted)
  })
}