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
  return new Promise((resolve, reject) => {
    /* TODO */
    if (id in RECEIPTS)
      resolve(RECEIPTS[id])
    else
      reject(Error("404 not found"))
  })
}
export const updateReceipt = (id: number, receipt: Receipt): Promise<Receipt> => {
  return new Promise((resolve, reject) => {
    /* TODO */
    if (id <= RECEIPTS.length) {
      RECEIPTS[id] = receipt
      resolve(RECEIPTS[id])
    }
    else
      reject(Error("404 not found"))
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
export const deleteReceipt = (id:number): Promise<Receipt> => {
  return new Promise((resolve, reject) => {
    /* TODO */
    if (id <= RECEIPTS.length) {
      const deleted = RECEIPTS.splice(id, 1)
      resolve(deleted[0])
    }
    else
      reject(Error("404 not found"))
  })
}