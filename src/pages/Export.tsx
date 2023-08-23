import React, { useEffect, useState } from 'react';
import { Database } from '../data/database';
import { BigIntReplacer } from '../helper/BigIntHelper';
import { redirect } from 'react-router-dom';

interface Props {
  database: Database;
}

export default function ExportPage({database}:Props) {
  const [loading, setLoading] = useState(true)
  const [objectUrl, setObjectUrl] = useState("")
  
  useEffect(() => {
    database.GetReceipts(undefined).then(
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

  if (loading) return <p>Loading...</p>
  return <div>
    <p>
      <a
        href={objectUrl}
        download={`DomMaster_${new Date().getTime()}.bak`}
      >
        <button
          id='export-account'
        >Export current account</button>
      </a>
    </p>
  </div>
}