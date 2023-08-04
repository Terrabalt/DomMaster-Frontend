import React from 'react';

import { Database } from '../data/database';
import { LocalDatabase } from '../data/localDatabase';
import '../css/index.css';
import { IntlProvider } from 'react-intl';
import { getLocale } from '../data/locale';

interface Props {
  onNewDatabase: (newDatabase: Database) => void;
}
  
export default function Landing({onNewDatabase} : Props) {

  return (
    <IntlProvider locale={getLocale()}>
      <div id={"header"}>
        <center>
          <h1>appname</h1>
          <div>
            <button
              id='new-local-account'
              onClick={() => {
                onNewDatabase(new LocalDatabase())
              }}
            >New Local Account</button>
          </div>
        </center>
      </div>
    </IntlProvider>
  )
}
