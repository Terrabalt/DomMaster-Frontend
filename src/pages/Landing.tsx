import React, { useEffect, useState } from 'react';

import { Database } from '../data/database';
import { IsLocalDatabaseExist, LocalDatabase, NewLocalDatabase } from '../data/localDatabase';
import '../css/index.css';
import { IntlProvider } from 'react-intl';
import { getLocale } from '../data/settings';

interface Props {
  onNewDatabase: (newDatabase: Database) => void;
}
  
export default function Landing({onNewDatabase} : Props) {
  const [isLocalDatabaseExist, setLocalDatabaseExist] = useState(false);
  useEffect(() => {
    IsLocalDatabaseExist()
      .then((v) => setLocalDatabaseExist(v))
  })

  return (
    <IntlProvider locale={getLocale()}>
      <div id={"header"}>
        <center>
          <h1>appname</h1>
          <div>
            <button
              id='new-local-account'
              onClick={() => {
                NewLocalDatabase()
                  .then(
                    (database) => onNewDatabase(database),
                    (e) => console.error(e)
                  )
              }}
            >New Local Account</button>
            { isLocalDatabaseExist? 
              <button
                id='existing-local-account'
                onClick={() => {
                  const database = new LocalDatabase()
                  database.init()
                    .then(
                      () => onNewDatabase(database),
                      (e) => console.error(e)
                    )
                }}
              >Use Existing Local Account</button>
            :<></>}
          </div>
        </center>
      </div>
    </IntlProvider>
  )
}
