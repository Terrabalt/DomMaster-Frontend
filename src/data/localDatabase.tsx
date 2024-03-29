import { Database } from "./database"
import { Receipt, ReceiptAssign } from "../dataclass"
import { BigIntReviver } from "../helper/BigIntHelper";

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
function deleteLocalDatabase():Promise<boolean> {
  return new Promise((resolve, reject) => {
    const resetreq = IndxDb.deleteDatabase(dbname)
    resetreq.onerror = () => {
      reject(resetreq.error);
    }
    resetreq.onsuccess = () => {
      resolve(true)
    }
  })
}
export function NewLocalDatabase():Promise<LocalDatabase> {
  let ldb : LocalDatabase
  return deleteLocalDatabase()
    .then((v)=> {
    if (!v) 
      return Promise.reject("Deleting current IndexedDB failed")
    ldb = new LocalDatabase();
    return ldb.Init()
  }).then(() => {
    return Promise.resolve(ldb)
  }, (e) => {
    return Promise.reject(e)
  })
}
export function ImportLocalDatabase(file?:File):Promise<LocalDatabase> {
  return new Promise((resolve, reject) => {
    let db : LocalDatabase
    if (file) {
      NewLocalDatabase()
        .then(async (database) => {
          db = database
          const obj : object[] = JSON.parse(await file.text(), BigIntReviver)
          const receipts = obj.map((v) => ReceiptAssign(v))
          await db.AddReceipts(receipts)
          
          resolve(db)
        }).catch((e) => {
          reject(e)
        })
    } else {
      reject("File is empty")
    }
  })
}
const IndxDb: IDBFactory = window.indexedDB;
export class LocalDatabase implements Database {
  db: IDBDatabase | undefined;
  error: DOMException | undefined;
   
  _isInit = false
  isInit() : boolean { return this._isInit }
  Init() :Promise<boolean>{
    return new Promise((resolve, reject) => {
      const req = IndxDb.open(dbname, 3);

      req.onsuccess = () => {
        this.db = req.result;
        this._isInit=true
        resolve(true);
      }
      req.onerror = () => {
        reject(this.error);
      }
      req.onupgradeneeded = () => {
        this.db = req.result;
        const receipt = this.db.createObjectStore("receipt", { keyPath: "id", autoIncrement: true });
        receipt?.createIndex("date", "date", {unique:false});
        receipt?.createIndex("category", "category", {unique:false});
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
  GetReceipts(range?:[Date, Date]): Promise<Receipt[]> {
    return new Promise((resolve, reject) => {
      if (this.db) {  
        const result : Receipt[] = [];
        const request = this.db.transaction(["receipt"], "readonly")
          .objectStore("receipt")
          .index("date")
          .openCursor(
            range ? 
              IDBKeyRange.bound(range[0], range[1], false, true)
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
  GetReceiptCategories(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      if (this.db) {  
        const result : string[] = [];
        const request = this.db.transaction(["receipt"], "readonly")
          .objectStore("receipt")
          .index("category")
          .getAll();
        request.onsuccess = () => {
          (request.result as Receipt[])
            .map((v) => v.category)
            .forEach((v) => !result.includes(v) ? result.push(v) : undefined)
          resolve(result)
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
  AddReceipts(receipts:Receipt[]): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(["receipt"], "readwrite")
        const store = transaction.objectStore("receipt");

        const puts = receipts.map((receipt) => new Promise((rs, rj) => {
          const request = store.put(receipt)
          request.onsuccess = () => {
            receipt.id = request.result.toString()
            rs(receipt)
          }
          request.onerror = () => {
            rj(request.error)
          }
        }))
        Promise.all(puts)
          .then(
            () => {
              transaction.commit(); resolve()
            },
            (e) => reject(e)
          )
        
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
  Cookie(): string {
    return "local"
  }
  Close(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.close()
        resolve(true)
      } else {
        reject("local storage has not been initialized")
      }
    })
  }
}
