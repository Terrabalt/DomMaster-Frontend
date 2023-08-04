import { Receipt } from "../dataclass";

export abstract class Database implements ReceiptDatabase {
  abstract GetReceipt: (id: number) => Promise<Receipt>;
  abstract GetReceipts: () => Promise<Receipt[]>;
  abstract UpdateReceipt: (id: number, receipt: Receipt) => Promise<Receipt>;
  abstract AddReceipt: (receipt: Receipt) => Promise<Receipt>;
  abstract DeleteReceipt: (id: number) => Promise<Receipt>;
}

export interface ReceiptDatabase {
  GetReceipt: (id:number)=>Promise<Receipt>
  GetReceipts: ()=>Promise<Receipt[]>
  UpdateReceipt:(id:number, receipt:Receipt) => Promise<Receipt>
  AddReceipt:(receipt:Receipt) => Promise<Receipt>
  DeleteReceipt:(id:number) => Promise<Receipt>
} 
