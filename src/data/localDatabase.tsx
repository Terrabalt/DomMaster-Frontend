import { Database } from "./database"
import { Receipt, ReceiptAssign } from "../dataclass"

const dbname = "dommaster_local";

export function IsLocalDatabaseExist() : Promise<boolean> {
  return new Promise((resolve, reject) => {
    const req = window.indexedDB.open(dbname)
    req.onerror = () => {
      reject(req.error)
    }
    req.onupgradeneeded = () => {
      req.transaction?.abort();
      resolve(false)
    }
    req.onsuccess = () => {
      resolve(true)
    }
  })
}
export function NewLocalDatabase():Promise<LocalDatabase> {
  return new Promise((resolve, reject) => {
    const lb = new LocalDatabase();
    const resetreq = lb.IndxDb.deleteDatabase(dbname)
    resetreq.onerror = () => {
      reject(resetreq.error);
    }
    resetreq.onsuccess = () => {
      const newreq = lb.IndxDb.open(dbname, 1);
      newreq.onsuccess = () => {
        lb.db = newreq.result;
        resolve(lb);
      }
      newreq.onerror = () => {
        reject(newreq.error);
      }
      newreq.onupgradeneeded = () => {
        lb.db = newreq.result;
        const receipt = lb.db.createObjectStore("receipt", { keyPath: "id", autoIncrement: true });
        receipt?.createIndex("date", "date", {unique:false});
        resolve(lb);
      };
    }
  })
}
export class LocalDatabase implements Database {
  Receipts : Receipt[] = []

  IndxDb: IDBFactory = window.indexedDB;
  db: IDBDatabase | undefined;
  error: DOMException | undefined;
   
  init() :Promise<void>{
    return new Promise((resolve, reject) => {
      const req = this.IndxDb.open(dbname, 1);

      req.onsuccess = () => {
        this.db = req.result;
        resolve();
      }
      req.onerror = () => {
        reject(this.error);
      }
      req.onupgradeneeded = () => {
        this.db = req.result;
        const receipt = this.db.createObjectStore("receipt", { keyPath: "id", autoIncrement: true });
        receipt?.createIndex("date", "date", {unique:false});
        resolve();
      };
    })
  }
  GetReceipt(id: string): Promise<Receipt> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const request = this.db.transaction(["receipt"], "readonly")
          .objectStore("receipt")
          .get(Number(id));

        request.onsuccess = () => {
          resolve(ReceiptAssign(request.result))
        }
        request.onerror = () => {
          reject(request.error)
        }
      } else {
        reject("local storage has not been initialized")
      }
    })
  }
  GetReceipts(range:[Date, Date]|undefined): Promise<Receipt[]> {
    return new Promise((resolve, reject) => {
      if (this.db) {  
        const result : Receipt[] = [];
        const request = this.db.transaction(["receipt"], "readonly")
          .objectStore("receipt")
          .index("date")
          .openCursor(
            range ? 
              IDBKeyRange.bound(range[0], range[1], false, false)
              : undefined
          );

        request.onsuccess = () => {
          const cursor = request.result;
          if (cursor) {
            result.push(ReceiptAssign(cursor.value));
            cursor.continue();
          } else {
            resolve(result)
          }
        }
        request.onerror = () => {
          reject(request.error)
        }
      } else {
        reject("local storage has not been initialized")
      }
    })
  }
  
  UpdateReceipt(id: string, receipt:Receipt): Promise<Receipt> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const request = this.db.transaction(["receipt"], "readwrite")
          .objectStore("receipt")
          .put({...receipt, id:Number(id)});

        request.onsuccess = () => {
          resolve(receipt)
        }
        request.onerror = () => {
          reject(request.error)
        }
      } else {
        reject("local storage has not been initialized")
      }
    })
  }
  AddReceipt(receipt:Receipt): Promise<Receipt> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {id:_, ...newReceipt} = receipt
        const request = this.db.transaction(["receipt"], "readwrite")
          .objectStore("receipt")
          .add(newReceipt);

        request.onsuccess = () => {
          receipt.id = request.result.toString()
          resolve(receipt)
        }
        request.onerror = () => {
          reject(request.error)
        }
      } else {
        reject("local storage has not been initialized")
      }
    })
  }
  DeleteReceipt(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const request = this.db.transaction(["receipt"], "readwrite")
          .objectStore("receipt")
          .delete(Number(id));

        request.onsuccess = () => {
          resolve(id)
        }
        request.onerror = () => {
          reject(request.error)
        }
      } else {
        reject("local storage has not been initialized")
      }
    })
  }
}
