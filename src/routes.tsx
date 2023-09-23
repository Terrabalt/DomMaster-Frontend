import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Overview from "./pages/Overview";
import AddReceipt from "./pages/AddReceipt";
import Layout from "./pages/Layout";

import ListReceipts from './pages/ListReceipts';
import ViewReceipt from './pages/ViewReceipt';
import EditReceipt from './pages/EditReceipt';
import ErrorPage from './pages/ErrorPage';
import Config from './pages/Config';
import { Database } from './data/database';
import Landing from './pages/Landing';
import ExportPage from './pages/Export';
import { isLoggedIn, setLoggedIn } from './data/settings';

export default function AppRoutes() {
  const [database, setdatabase] = useState<Database|null>(isLoggedIn());
  const [loading, setLoading] = useState(true);

  const initDatabase = useCallback(async () => {
    if (database && !database.isInit()) {
      await database.Init()
    }
    setLoading(false)
  }, [database])

  useEffect(() => {
    initDatabase()
  }, [database, initDatabase])

  const onLogout = () => { 
    database?.Close()?.then(
      (v) => v ? setdatabase(null) : null,
      (e) => console.error(e)
    )
    setLoggedIn()
  }

  const onNewDatabase = (newDatabase:Database) => {
    setLoggedIn(newDatabase)
    setdatabase(newDatabase)
  }

  return (
    <BrowserRouter>
      <Routes>
          { loading?
            <Route path="*" element={<></>} ></Route>
            : database?
            <>
              <Route path="/" element={<Layout />} >
                <Route index element={<Overview database={database} />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/export" element={<ExportPage database={database}/>} />
                <Route path="/config" element={<Config onLogout={onLogout}/>} />
                <Route path="/receipts"> 
                  <Route index element={<ListReceipts database={database} />}/>
                  <Route path="add" element={<AddReceipt database={database} />} />
                  <Route path=":id">
                    <Route index element={<ViewReceipt database={database} />}/>
                    <Route path="edit" element={<EditReceipt database={database} />} />
                  </Route>
                </Route>
              </Route>
            </>
            :
            <>
              <Route index element={<Landing onNewDatabase={onNewDatabase}/>} />
              <Route path="*" element={<Navigate to="/" replace />}/>
            </>
          }
      </Routes>
    </BrowserRouter>
  );
}