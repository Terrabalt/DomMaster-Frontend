import React, { useEffect, useState } from 'react';
import { Database } from '../data/database';
import { BigIntReplacer } from '../helper/BigIntHelper';
import { redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

interface Props {
  database: Database;
}

export default function ExportPage({database}:Props) {
  const [loading, setLoading] = useState(true)
  const [objectUrl, setObjectUrl] = useState("")
  
  useEffect(() => {
    database.GetReceipts().then(
      (receipts) => {
        const blob = new Blob([JSON.stringify(receipts, BigIntReplacer)], {
          type: "application/json",
        })
        setObjectUrl(URL.createObjectURL(blob))
        setLoading(false)
      }, () => {
        redirect("/error")
      }
    )
  })

  if (loading) return <p><FormattedMessage description="loading-text" defaultMessage="Loading..." id="gWo/FW" /></p>
  return <div>
    <p>
      <a
        href={objectUrl}
        download={`DomMaster_${new Date().getTime()}.bak`}
      >
        <button
          id='export-account'
        >
          <FormattedMessage
            description="export-account-button"
            defaultMessage="Export current account" id="YbkLom"
          />
        </button>
      </a>
    </p>
  </div>
}