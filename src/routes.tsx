import React, { useContext } from 'react';
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
import { setLoggedIn } from './data/settings';
import { DatabaseContext } from './data/databaseContext';

export default function AppRoutes() {
  const {database, setDatabase, loading} = useContext(DatabaseContext)

  const onLogout = () => { 
    database?.Close()?.then(
      (v) => v ? setDatabase(null) : null,
      (e) => console.error(e)
    )
    setLoggedIn()
  }

  const onNewDatabase = (newDatabase:Database) => {
    setLoggedIn(newDatabase)
    setDatabase(newDatabase)
  }

  return (
    <BrowserRouter>
      <Routes>
          { loading?
            <Route path="*" element={<></>} ></Route>
            : database?
            <>
              <Route path="/" element={<Layout onLogout={onLogout}/>} >
                <Route index element={<Overview database={database} />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/config" element={<Config database={database}/>} />
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