import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { Database } from "./database";
import { isLoggedIn } from "./settings";

interface contextType {
  database: Database|null;
  setDatabase: (newDb: Database|null) => Promise<boolean>;
  loading: boolean;
}
export const DatabaseContext = React.createContext<contextType>({
  database: null,
  setDatabase:() => {return Promise.reject("Not implemented")},
  loading:false});

type Props = {
  children?: ReactNode;
}
export function DatabaseContextProvider({children}:Props) {
  const [database, setdatabase] = useState<Database|null>(isLoggedIn());
  const [loading, setLoading] = useState(true);

  const initDatabase = useCallback(async () => {
    let result = false
    if (database && !database.isInit()) {
      result = await database.Init()
    }
    setLoading(false)
    return result
  }, [database])

  const onSetDatabase = useCallback(async (newDb: Database|null) => {
    setLoading(true)
    setdatabase(newDb)
    return await initDatabase()
  }, [])

  useEffect(() => {
    initDatabase()
  }, [database, initDatabase])

  return <DatabaseContext.Provider value={{database:database, setDatabase:onSetDatabase, loading:loading}}>
    {children}
  </DatabaseContext.Provider>
}