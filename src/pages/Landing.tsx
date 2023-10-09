import React, { useEffect, useRef, useState } from 'react';

import { Database } from '../data/database';
import { ImportLocalDatabase, IsLocalDatabaseExist, LocalDatabase, NewLocalDatabase } from '../data/localDatabase';
import '../css/index.css';
import { FormattedMessage } from 'react-intl';

interface Props {
  onNewDatabase: (newDatabase: Database) => void;
}
  
export default function Landing({onNewDatabase} : Props) {
  const [isLocalDatabaseExist, setLocalDatabaseExist] = useState(false);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [isLoading, setLoading] = useState(false);
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
  if (isLoading) return <p><FormattedMessage description="loading-text" defaultMessage="Loading..." id="gWo/FW" /></p>
  return (
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
            >
              <FormattedMessage
                id="mrM+Oi"
                description="new-account-button"
                defaultMessage="New Local Account"
              />
            </button>
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
              >
                <FormattedMessage
                  id="s5YaBy"
                  description="existing-account-button"
                  defaultMessage="Use Existing Local Account"
                />
              </button>
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
            >
              <FormattedMessage
                id="k+yw42"
                description="import-account-button"
                defaultMessage="Import Account File"
              />
            </button>
          </p>
        </div>
      </center>
    </div>
  )
}