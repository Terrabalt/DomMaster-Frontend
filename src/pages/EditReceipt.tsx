import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import { Receipt } from '../dataclass';

import { ReceiptDatabase } from '../data/database';
import ReceiptTable from '../components/ReceiptTable';
import { FormattedMessage } from 'react-intl';

interface Props {
  database: ReceiptDatabase;
}

export default function EditReceipt({database} : Props) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [receipt, setReceipt] = useState<Receipt>(new Receipt());
  const [isLoading, setLoading] = useState(true);
  const [isValid, setValid] = useState(true);

  useEffect(() => {
    if (id)
      database.GetReceipt(id).then(v => {
        setReceipt(v);
        setLoading(false)
      })
    else 
      redirect("/error")
  }, [])

  if (isLoading) return <><FormattedMessage description="loading-text" defaultMessage="Loading..." id="gWo/FW" /></>
  return (
    <div>
      <Link to="..">
        <FormattedMessage
          description="goback-text-button"
          defaultMessage="Return" id="909D/G"
        />
      </Link>
      <ReceiptTable receipt={receipt} onChange={v => {setReceipt(v)}} setValid={setValid}/>
      <button
        id='finish-edit'
        onClick={() => {
          if (!isValid) return;
          database.UpdateReceipt(id||"", receipt).then(()=>{
            navigate(-1);
          })
        }}
      >
        <FormattedMessage
          description="finish-button"
          defaultMessage="Finish" id="nZE/Ow"
        />
      </button>
    </div>
  )
}
