import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import AddReceipt from "./pages/AddReceipt";
import Layout from "./pages/Layout";

import ListReceipts from './pages/ListReceipts';
import ViewReceipt from './pages/ViewReceipt';
import EditReceipt from './pages/EditReceipt';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Overview />} />
          <Route path="/receipts"> 
            <Route index element={<ListReceipts />}/>
            <Route path="add" element={<AddReceipt />} />
            <Route path=":id">
              <Route index element={<ViewReceipt />}/>
              <Route path="edit" element={<EditReceipt />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}