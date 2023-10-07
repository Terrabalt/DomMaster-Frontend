import React, { useEffect, useRef, useState } from 'react';

import { Database } from '../data/database';
import { ImportLocalDatabase, IsLocalDatabaseExist, LocalDatabase, NewLocalDatabase } from '../data/localDatabase';
import '../css/index.css';
import { IntlProvider } from 'react-intl';
import { getLocale } from '../data/settings';

interface Props {
  onNewDatabase: (newDatabase: Database) => void;
}
  
export default function Landing({onNewDatabase} : Props) {
  const [isLocalDatabaseExist, setLocalDatabaseExist] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    IsLocalDatabaseExist()
      .then((v) => setLocalDatabaseExist(v))
  })
  const onFileInputChange = () => {
    const file = inputFile.current?.files?.item(0)
    if (file) {
      setLoading(true)
      ImportLocalDatabase(file)
        .then(async (database) => {
            setLoading(false)
            onNewDatabase(database)
        }).catch((e) => {
          console.error(e)
          setLoading(false)
        })
    }
  }
  const onButtonClick = () => {
    inputFile.current?.click();
  };
  if (loading) return <p>loading...</p>
  return (
    <IntlProvider locale={getLocale()}>
      <div id={"header"}>
        <center>
          <h1>appname</h1>
          <div>
            <p>
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
            </p>
            { isLocalDatabaseExist? 
              <p>
                <button
                  id='existing-local-account'
                  onClick={() => {
                    const database = new LocalDatabase()
                    database.Init()
                      .then(
                        () => onNewDatabase(database),
                        (e) => console.error(e)
                      )
                  }}
                >Use Existing Local Account</button>
              </p>
            :<></>}
            <p>
              <input
                type='file'
                id='import'
                accept=".bak"
                onChange={() => onFileInputChange()}
                ref={inputFile}
                style={{display: 'none'}}
              />
              <button
                id='import-local-account'
                onClick={() => onButtonClick()}
              >Import Account File</button>
            </p>
          </div>
        </center>
      </div>
    </IntlProvider>
  )
}