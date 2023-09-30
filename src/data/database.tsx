import { Receipt } from "../dataclass";

export abstract class Database implements ReceiptDatabase {
  abstract GetReceipt: (id: string) => Promise<Receipt>;
  abstract GetReceipts: (range?:[Date, Date]) => Promise<Receipt[]>;
  abstract GetReceiptCategories: ()=>Promise<string[]>;
  abstract UpdateReceipt: (id: string, receipt: Receipt) => Promise<Receipt>;
  abstract AddReceipt: (receipt: Receipt) => Promise<Receipt>;
  abstract DeleteReceipt: (id: string) => Promise<string>;
  abstract Cookie: () => string;
  abstract Init: () => Promise<boolean>;
  abstract isInit: () => boolean;
  abstract Close: () => Promise<boolean>;
}

export interface ReceiptDatabase {
  GetReceipt: (id:string)=>Promise<Receipt>
  GetReceipts: (range?:[Date, Date])=>Promise<Receipt[]>
  GetReceiptCategories: ()=>Promise<string[]>
  UpdateReceipt:(id:string, receipt:Receipt) => Promise<Receipt>
  AddReceipt:(receipt:Receipt) => Promise<Receipt>
  DeleteReceipt:(id:string) => Promise<string>
} 
