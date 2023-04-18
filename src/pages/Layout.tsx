import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import '../css/index.css';
import { IntlProvider } from 'react-intl';
import { getLocale } from '../data/locale';

export default function Layout() {

    return (
      <IntlProvider locale={getLocale()}>
        <div id={"header"}>
          <center>
            <h1>appname</h1>
            <div>
              <Link to="/"> Home </Link>
              <Link to="/receipts"> Receipts </Link>
              <Link to="/config"> config </Link>
            </div>
          </center>
        </div>
        <hr/>
        <div id={"content"}>
          <center>
            <Outlet/>
          </center>
        </div>
      </IntlProvider>
    )
}