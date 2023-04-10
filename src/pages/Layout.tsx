import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import '../css/index.css';

export default function Layout() {
    return (
      <div>
        <div id={"header"}>
          <center>
            <h1>appname</h1>
            <div>
              <Link to="/"> Home </Link>
              <Link to="./receipts"> Receipts </Link>
            </div>
          </center>
        </div>
        <hr/>
        <div id={"content"}>
          <center>
            <Outlet/>
          </center>
        </div>
      </div>
    )
}