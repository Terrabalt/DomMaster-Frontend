import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import '../css/index.css';
import { FormattedMessage } from 'react-intl';

interface Props {
  onLogout: () => void;
}

export default function Layout({onLogout} : Props) {
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
              <a href="/" onClick={() => onLogout()}>
                <FormattedMessage
                  id="TQH3tN"
                  description="logout-layout-text-button"
                  defaultMessage="Logout"
                />
              </a>
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