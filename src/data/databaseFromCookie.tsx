import { Database } from "./database";
import { LocalDatabase } from "./localDatabase";

export default function DatabaseFromCookie(cookie: string | null): (Database | null) {
    switch (cookie) {
      case (new LocalDatabase().Cookie()): {
        const db = new LocalDatabase()
        db.Init()
        return db
      }
      case null:
      default:
        return null;
    }
}