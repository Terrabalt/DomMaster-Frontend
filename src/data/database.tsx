import { Receipt } from "../dataclass";

export abstract class Database implements ReceiptDatabase {
  abstract GetReceipt: (id: string) => Promise<Receipt>;
  abstract GetReceipts: () => Promise<Receipt[]>;
  abstract UpdateReceipt: (id: string, receipt: Receipt) => Promise<Receipt>;
  abstract AddReceipt: (receipt: Receipt) => Promise<Receipt>;
  abstract DeleteReceipt: (id: string) => Promise<string>;
}

export interface ReceiptDatabase {
  GetReceipt: (id:string)=>Promise<Receipt>
  GetReceipts: ()=>Promise<Receipt[]>
  UpdateReceipt:(id:string, receipt:Receipt) => Promise<Receipt>
  AddReceipt:(receipt:Receipt) => Promise<Receipt>
  DeleteReceipt:(id:string) => Promise<string>
} 
