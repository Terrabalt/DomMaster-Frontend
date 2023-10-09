import React, { useEffect, useState } from 'react';
import { Link, Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import { Receipt } from '../dataclass';
import { ReceiptDatabase } from '../data/database';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import ReceiptTable from '../components/ReceiptTable';
import { FormattedMessage } from 'react-intl';

interface Props {
  database: ReceiptDatabase;
}

function ViewReceipt({database} : Props) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [receipt, setReceipt] = useState<Receipt | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (id)
      database.GetReceipt(id).then(v => {
        setReceipt(v);
        return undefined
      }, e => {
        return e
      }).then(() => {
        setLoading(false)
      })
    else 
      redirect("/error")
  }, [])

  if (isLoading) return <><FormattedMessage id="gWo/FW" description="loading-text" defaultMessage="Loading..." /></>
  if (receipt === undefined) return <Navigate to="/error"/>
  return (
    <div>
      <Link to=".."><FormattedMessage id="sFKORz" description="return-text-button" defaultMessage="Return"/></Link>
      <ReceiptTable receipt={receipt}/>
      <button
        id='start-edit'
        onClick={() => {
          navigate('./edit');
        }}
      ><FormattedMessage id="Z1nz7d" description="edit-text-button" defaultMessage="Edit"/></button>
    </div>
  )
}

export default ViewReceipt;
