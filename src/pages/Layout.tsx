import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import '../css/index.css';
import { FormattedMessage } from 'react-intl';

export default function Layout() {
    return (
      <>
        <div id={"header"}>
          <center>
            <h1>appname</h1>
            <div>
              <Link to="/">
                <FormattedMessage
                  id="5uoVuy"
                  description="home-layout-text-button"
                  defaultMessage="Home"
                />
              </Link>
              <Link to="/receipts">
                <FormattedMessage
                  id="lPPB5V"
                  description="receipts-layout-text-button"
                  defaultMessage="Receipts"
                  />
                </Link>
              <Link to="/config">
                <FormattedMessage
                  id="eKwlPA"
                  description="config-layout-text-button"
                  defaultMessage="Config"
                />
              </Link>
              <Link to="/export">
                <FormattedMessage
                  id="TmH52m"
                  description="export-layout-text-button"
                  defaultMessage="Export"
                  />
                </Link>
            </div>
          </center>
        </div>
        <hr/>
        <div id={"content"}>
          <center>
            <Outlet/>
          </center>
        </div>
      </>
    )
}